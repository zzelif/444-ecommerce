//src\components\gallery\gallery.tsx

"use client";

import Image from 'next/image'
import { TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react'
import { Image as ImageType } from "@/components/types/images"
import GalleryTab from "@/components/gallery/gallerytab"

interface GalleryProps {
  images: ImageType[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
    return (
        <TabGroup as="div" className={"flex flex-col-reverse"}>
            <div className="mt-6 w-full">
                <TabList className={"grid grid-cols-4 gap-6"}>
                    {images.map((image) => (
            <GalleryTab key={image.name} image={image} />
          ))}
                </TabList>
            </div>
            <TabPanels className={"aspect-square sm:w-full sm:h-full lg:w-4/5 lg:h-4/5"}>
                {images.map((image) => (
          <TabPanel key={image.name}>
            <div className='aspect-square relative soverflow-hidden w-full'>
              <Image
                priority
                fill
                src={image.url}
                alt={image.url}
                className='object-cover object-center rounded-xl'
              />
            </div>
          </TabPanel>
        ))}
            </TabPanels>
        </TabGroup>
    )
}

export default Gallery