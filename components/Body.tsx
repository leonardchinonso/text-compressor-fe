'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';
import { useRouter } from 'next/navigation';
import {router} from "next/client";
import {BenchmarkRequest, BenchmarkResponse, intoCompressionMetrics} from "@/utils/service";
import { json } from 'stream/consumers';
// import { toast, Toaster } from 'react-hot-toast';
import {CompressionContext} from "../context/context";
import { CompressionContextType, ICompressionMetric, ICompressionMetricState } from '@/type';


const generateFormSchema = z.object({
  text: z.string().min(1),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;


interface CompressionInfo {
  data: ICompressionMetric[]
  error: Error | null
  errorMessage: string
  statusCode: number
}

async function getSingleThreadMetrics(values: GenerateFormValues): Promise<CompressionInfo> {
  const request: BenchmarkRequest = {
    text: values.text,
    multithread: false,
  }
  return getMetrics(request)
}

async function getMultiThreadMetrics(values: GenerateFormValues): Promise<CompressionInfo> {
  const request: BenchmarkRequest = {
    text: values.text,
    multithread: true,
  }
  return getMetrics(request)
}


async function getMetrics(request: BenchmarkRequest): Promise<CompressionInfo> {
  let compressionInfo: CompressionInfo = {
    data: [],
    error: null,
    errorMessage: '',
    statusCode: 200
  }

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    // Handle API errors.
  if (!response.ok || response.status !== 200) {
    const text = await response.text();
    let msg = `Failed to retrieve benchmark metrics: ${response.status}, ${text}`;
    compressionInfo.errorMessage = msg;
    compressionInfo.statusCode = response.status;
    throw new Error(msg);
  }

  const httpResponse = await response.json();
  if (httpResponse.status_code != 200) {
    let msg = `Failed to retrieve benchmark metrics, received error code: ${httpResponse.status_code}`;
    compressionInfo.errorMessage = msg;
    compressionInfo.statusCode = httpResponse.status_code;
    throw new Error(msg);
  }

  const data: BenchmarkResponse[] = httpResponse.data;
  compressionInfo.data = intoCompressionMetrics(data);
  console.log("Single Thread Compression Metrics: ", compressionInfo.data);

  } catch(error) {
    return compressionInfo;
  }

  return compressionInfo;
}


const Body = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<BenchmarkResponse | null>(null);
  const { updateCompressionMetrics } = useContext(CompressionContext) as CompressionContextType;

  // handleSubmit handles the submit event of the form
  const handleSubmit = useCallback(
     async (values: GenerateFormValues) => {
        // set the defaults for all values
        setIsLoading(true);
        setResponse(null);

        try {
          const singleThreadCompressionData = await getSingleThreadMetrics(values);
          const multiThreadCompressionData = await getMultiThreadMetrics(values);

          if (singleThreadCompressionData.error || multiThreadCompressionData.error) {
            throw new Error(
              singleThreadCompressionData.error ? singleThreadCompressionData.errorMessage : multiThreadCompressionData.errorMessage
            );
          }

          const compressionMetrics: ICompressionMetricState = {
            singleThreadMetrics: singleThreadCompressionData.data,
            multiThreadMetrics: multiThreadCompressionData.data
          }

          updateCompressionMetrics(compressionMetrics);

          router.push('/result');
        } catch(error) {
          if (error instanceof Error) {
            setError(error);
          }
        }
        finally {
          setIsLoading(false);
        }
      },

      [router],
  );

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      text: '',
    },
  });

  return (
    <div className="light flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10">
        <div className="col-span-1">
          <h1 className="text-3xl font-bold mb-10">Begin compression</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Lorem Ipsum..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center
                 max-w-[200px] mx-auto w-full"
                >
                  {isLoading ? (
                    <LoadingDots color="white" />
                  ) : response ? (
                    '✨ Recompress'
                  ) : (
                    'Compress'
                  )}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Body;
