"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import {Tabs, Tab, Switch, Card, CardBody} from "@nextui-org/react";
import * as _ from "lodash";
import BarChart from "@/components/BarChart";
import { useContext, useEffect, useState } from "react";
import { CompressionContext } from "@/context/context";
import { CompressionContextType } from "@/type";
import { formatCompressionMetrics } from "@/utils/service";


const columns = [
  {
    key: "algorithm",
    label: "ALGORITHM",
  },
  {
    key: "timeTaken",
    label: "COMPRESSION TIME",
  },
  {
    key: "compressionRatio",
    label: "COMPRESSION RATIO",
  },
  {
    key: "bitRate",
    label: "BIT RATE",
  },
  {
    key: "memoryUsed",
    label: "MEMORY USED",
  },
];

const Result = () => {
  const [selected, setSelected] = useState<"single" | "multi">("single");
  let { compressionMetrics } = useContext(CompressionContext) as CompressionContextType;

  const clonedCompressionMetrics = _.cloneDeep(compressionMetrics);

  const singleThreadCompressionMetrics = formatCompressionMetrics(clonedCompressionMetrics.singleThreadMetrics);
  const multiThreadCompressionMetrics = formatCompressionMetrics(clonedCompressionMetrics.multiThreadMetrics);

  const mainCardClass = "rounded-2xl dark text-foreground bg-background py-10 px-10";

  const onSelectChange = (selected: "single" | "multi") => {
    setSelected(selected);
  }

  return (
    <div className="flex flex-col">
      <Tabs className="dark text-foreground bg-background justify-between" aria-label="Options" size="lg" color="default" selectedKey={selected} onSelectionChange={onSelectChange}>
        <Tab key="single" title="Single Threaded">
          <Card>
            <CardBody>
              <div className={mainCardClass}>
                <Table aria-label="Example table with dynamic content">
                  <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={singleThreadCompressionMetrics}>
                    {(item) => (
                        <TableRow key={item.key}>
                          {(columnKey) => (
                              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="multi" title="Multi Threaded">
          <Card>
            <CardBody>
              <div className={mainCardClass}>
                <Table aria-label="Example table with dynamic content">
                  <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>{column.label}</TableColumn>
                    )}
                  </TableHeader>
                  <TableBody items={multiThreadCompressionMetrics}>
                    {(item) => (
                        <TableRow key={item.key}>
                          {(columnKey) => (
                              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                          )}
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
      <div className="pb-10 pt-00 mx-50">
        <BarChart threadType={selected}/>
      </div>
    </div>
  );
};

export default Result;
