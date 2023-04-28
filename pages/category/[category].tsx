import Tabs from '@/components/Tabs'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { GetServerSideProps } from 'next';
import { fetchArticles, fetchCategories } from '@/http';
import { AxiosResponse } from 'axios';
import { IArticle, ICategory, ICollectionResponse, IPagination, IQueryOptions } from '@/types';
import qs from 'qs';
import ArticleList from '@/components/ArticleList';
import { capitalizeFirstLetter, debounce, removeDash } from '@/utils';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';

interface IPropType {
  categories : {
    items : ICategory[];
    pagination : IPagination;
  },
  articles : {
    items : IArticle[];
    pagination : IPagination;
  },
  slug : string;

}

const Category = ({categories, articles, slug} : IPropType) => {
  const { page, pageCount } = articles.pagination;
  const router = useRouter();

  const {category : categorySlug } = router.query
  // console.log(categorySlug)
  const formattedCategory = () => {
    return capitalizeFirstLetter(removeDash(slug));
  }

  const handleSearch = (query : string) => {
    router.push(`/category/${categorySlug}/?search=${query}`);
  } 
  return (
    <>
      <Head>
        <title>{formattedCategory()}</title>
        <meta
          name='description'
          content='Created by next js app'
        />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <Tabs categories={categories.items}  handleOnSearch={debounce(handleSearch, 500)}/>

      <ArticleList articles = {articles.items}/>

      <Pagination page = {page} pageCount={pageCount}
       redirectUrl={`/category/${categorySlug}`}
      />

    </>
  );
};

export const getServerSideProps : GetServerSideProps = async ({ query }) =>{
  // console.log(query.Category)
  const options : IQueryOptions = {
    populate : ['author.avatar'],
    sort : ['id:desc'],
    filters : {
      category : {
        slug : query.category, 
      },
    },
    pagination : {
      page : query.page ? +query.page : 1, 
      pageSize : 1,
    },
  };

  if(query.search) {
    options.filters = {
      Title : {
        $containsi: query.search
      },
    }
  }

  const queryString = qs.stringify(options);
  //Articles
  const {data : articles} : AxiosResponse<ICollectionResponse<IArticle[]>> =
  await fetchArticles(queryString);

  const { 
    data: categories,
  }: AxiosResponse<ICollectionResponse<ICategory[]>> =
  await fetchCategories();

  return {
    props : {
      categories : {
        items : categories.data,
        pagination : categories.meta.pagination, 
      },
      articles : {
        items : articles.data,
        pagination : articles.meta.pagination,
      },
      slug : query.category,
    }
  }
}

export default Category



