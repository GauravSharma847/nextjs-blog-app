import { IArticle } from '@/types';
import React from 'react'
import BlogCardWithImage from './BlogCardWithImage';
import Blogcard from './Blogcard';

export interface IPropType {
    articles : IArticle[];
}

const ArticleList = ({articles} : IPropType) => {
    
  return (
    <div className='grid lg:grid-cols-2 grid-gap gap-16 mt-16 sm:p-5 '>
        {
            articles.map((article, idx) => {
                return( 
                <div key ={article.id}>
                    {idx === 1  
                        ? (<BlogCardWithImage article={article} />)
                        : (<Blogcard article = {article} />)
                    }
                </div>
                )
            })
        }
    </div>
  )
}

export default ArticleList

