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
import BarChart from "@/components/BarChart";

const rowsSingle = [
  {
    key: "1",
    algorithm: "Huffman Encoding",
    compression_time: "40390ms",
    decompression_time: "23700ms",
    bit_rate: "3.75mb/s",
    memory_usage: "751KB",
  },
  {
    key: "2",
    algorithm: "Burrows-Wheeler Transform",
    compression_time: "34300ms",
    decompression_time: "12400ms",
    bit_rate: "1.05mb/s",
    memory_usage: "500KB",
  },
  {
    key: "3",
    algorithm: "Lempel Ziv Welch",
    compression_time: "78933ms",
    decompression_time: "20000ms",
    bit_rate: "3mb/s",
    memory_usage: "1251KB",
  },
  {
    key: "4",
    algorithm: "Run Length Encoding",
    compression_time: "19000ms",
    decompression_time: "23700ms",
    bit_rate: "0.5mb/s",
    memory_usage: "1024KB",
  },
];

const rowsMulti = [
  {
    key: "1",
    algorithm: "Huffman Encoding",
    compression_time: "324ms",
    decompression_time: "23700ms",
    bit_rate: "3.75mb/s",
    memory_usage: "751KB",
  },
  {
    key: "2",
    algorithm: "Burrows-Wheeler Transform",
    compression_time: "34300ms",
    decompression_time: "12400ms",
    bit_rate: "1.05mb/s",
    memory_usage: "500KB",
  },
  {
    key: "3",
    algorithm: "Lempel Ziv Welch",
    compression_time: "78933ms",
    decompression_time: "20000ms",
    bit_rate: "3mb/s",
    memory_usage: "1251KB",
  },
  {
    key: "4",
    algorithm: "Run Length Encoding",
    compression_time: "19000ms",
    decompression_time: "23700ms",
    bit_rate: "0.5mb/s",
    memory_usage: "1024KB",
  },
];

const columns = [
  {
    key: "algorithm",
    label: "ALGORITHM",
  },
  {
    key: "compression_time",
    label: "COMPRESSION TIME",
  },
  {
    key: "decompression_time",
    label: "DECOMPRESSION TIME",
  },
  {
    key: "bit_rate",
    label: "BIT RATE",
  },
  {
    key: "memory_usage",
    label: "MEMORY USAGE",
  },
];

const mainCardClass = "rounded-2xl dark text-foreground bg-background py-10 px-10";

const Result = () => {
  return (
    <div className="flex flex-col">
      {/*<div className="dark text-foreground bg-background">*/}
      {/*  <Switch defaultSelected aria-label="Singlethreaded"/>*/}
      {/*</div>*/}
      <Tabs className="dark text-foreground bg-background justify-between" aria-label="Options" size="lg" color="default">
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
                  <TableBody items={rowsSingle}>
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
                  <TableBody items={rowsMulti}>
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
        <BarChart/>
      </div>
    </div>
  );
};

export default Result;
