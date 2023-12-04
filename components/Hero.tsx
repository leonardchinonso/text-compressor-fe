'use client';

import Image from 'next/image';
import NavLink from './NavLink';

let heroImages = ['/1.jpg', '/6.jpg', '/3.jpg', '/4.jpg', '/5.jpg', '/2.jpg'];

export default function Hero() {
  return (
    <section>
      <div className="custom-screen pt-48 text-gray-600">
        <div className="space-y-5 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-gray-800 font-extrabold mx-auto sm:text-6xl">
            Benchmark and compare text compression algorithms
          </h1>
          <p className="max-w-xl mx-auto">
            A cool web-based tool to upload your own text files and select from
            a range of text compression algorithms to test and compare.
          </p>
          <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
            <NavLink
              href="/start"
              className="text-white bg-gray-800 hover:bg-gray-600 active:bg-gray-900 "
            >
              Upload a text file
            </NavLink>
            <NavLink
              target="_blank"
              href="https://github.com/leonardchinonso/text-compressor-fe"
              className="text-gray-700 border hover:bg-gray-50"
              scroll={false}
            >
              Learn more
            </NavLink>
          </div>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 pt-10">
            {heroImages.map((image, idx) => (
              <Image
                key={idx}
                alt="image"
                src={image}
                width={500}
                height={500}
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
