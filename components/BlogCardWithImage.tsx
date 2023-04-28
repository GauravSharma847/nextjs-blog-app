import React from 'react'
import { IArticle } from '@/types'
import Link from 'next/link';
import Image from 'next/image';

interface IPropType {
    article : IArticle;
}
const BlogCardWithImage = ({article} : IPropType) => {
  return (
    <div className='bg-gradient-to-r from-violet-500 to-violet-900 rounded-md flex items-center h-64 gap-20'>
        <Link href = "#">
            <span className='text-2xl w-2/3 text-white p-6 font-bold after:content-[""] after:bg-primary after:block after:w-16 after:h-1 after:rounded-md after:mt-2 after:ml-6 cursor-pointer'>
                {article.attributes.Title}
            </span>
        </Link>

        <Image src = "/book.png" width={140} height={140}  alt = "" />
    </div>
  )
}

export default BlogCardWithImage


