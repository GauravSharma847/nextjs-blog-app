import React from 'react'
import {IArticle } from '@/types'
import Image from 'next/image';
import { formatDate } from '@/utils';

export interface IPropType {
    article : IArticle;
}

const ImageAuthorDate = ({article} : IPropType) => {
  return (
    <>
    <div className='flex items-center my-4'>
            <div className='rounded-lg overflow-hidden flex items-center justify-center mr-2'>
                <Image src = {`${article.attributes.author.data.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                height={40}
                width={40}
                alt =""/>

            </div>
            <span className='text-sm font-bold text-gray-600'>
                {article.attributes.author.data.attributes.firstname}{" "}
                {article.attributes.author.data.attributes.lastname}{" "}on
                {" "}
                <span className='text-gray-400'>
                    {formatDate(article.attributes.createdAt)}
                </span>
            </span>
        
        </div>
    </>
  )
}

export default ImageAuthorDate