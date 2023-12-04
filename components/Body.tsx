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
import { useCallback, useEffect, useState } from 'react';
// import { AlertCircle } from 'lucide-react';
// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import LoadingDots from '@/components/ui/loadingdots';
import { Algorithm } from '@/components/Algorithm';
import { useRouter } from 'next/navigation';
import {router} from "next/client";
import {BenchmarkRequest, BenchmarkResponse} from "@/utils/service";
import {HuffmanEncoding, Algorithms} from "@/utils/utils";
// import { toast, Toaster } from 'react-hot-toast';

const generateFormSchema = z.object({
  path: z.string().min(1),
  algorithm: z.string().min(3).max(160),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = ({
  imageUrl,
  prompt,
  redirectUrl,
  modelLatency,
  id,
}: {
  imageUrl?: string;
  prompt?: string;
  redirectUrl?: string;
  modelLatency?: number;
  id?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chosenAlgorithm, setChosenAlgorithm] = useState(HuffmanEncoding);
  // const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<BenchmarkResponse | null>(null);
  // const [submittedURL, setSubmittedURL] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      path: '',
      algorithm: '',
    },
  });

  // useEffect(() => {
  //   if (imageUrl && prompt && redirectUrl && modelLatency && id) {
  //     setResponse({
  //       image_url: imageUrl,
  //       model_latency_ms: modelLatency,
  //       id: id,
  //     });
  //     // setSubmittedURL(redirectUrl);
  //
  //     form.setValue('algorithm', prompt);
  //     form.setValue('path', redirectUrl);
  //   }
  // }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const handleAlgorithmClick = useCallback(
    (algorithm: string) => {
      form.setValue('algorithm', algorithm);
      setChosenAlgorithm(algorithm);
    },
    [form],
  );

  // handleSubmit handles the submit event of the form
  const handleSubmit = useCallback(
      async (values: GenerateFormValues) => {
        // set the defaults for all values
        setIsLoading(true);
        setResponse(null);

        // create a request for the benchmarking
        const request: BenchmarkRequest = {
          file_path: values.path,
          algorithm: values.algorithm,
        };

        // get the response from the api call
        console.log(request);
        const response: BenchmarkResponse = {
          bit_rate: "10",
          compression_ratio: "0.34",
        };

        // Handle API errors from response
        router.push('/result');
        setIsLoading(false);
      },
      [router],
  );

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
                  name="path"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File path</FormLabel>
                      <FormControl>
                        <Input placeholder="user/leonard/chinonso/bible.txt" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="my-2">
                  <p className="text-sm font-medium mb-3">Pick one algorithm</p>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm">
                    {Algorithms.map((algorithm) => (
                      <Algorithm
                        key={algorithm}
                        algorithm={algorithm}
                        onClick={() => handleAlgorithmClick(algorithm)}
                        disabled={chosenAlgorithm == algorithm}
                      />
                    ))}
                  </div>
                </div>
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

                {/*{error && (*/}
                {/*  <Alert variant="destructive">*/}
                {/*    <AlertCircle className="h-4 w-4" />*/}
                {/*    <AlertTitle>Error</AlertTitle>*/}
                {/*    <AlertDescription>{error.message}</AlertDescription>*/}
                {/*  </Alert>*/}
                {/*)}*/}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Body;
