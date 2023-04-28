import Image from 'next/image';
// import { Inter } from 'next/font/google'
import Head from 'next/head';
import { GetServerSideProps, NextPage } from 'next';
import { fetchArticles, fetchCategories } from '../http/index';
import { IArticle, ICategory, ICollectionResponse, IPagination, IQueryOptions } from '@/types';
import { AxiosResponse } from 'axios';
import Tabs from '@/components/Tabs';
import ArticleList from '@/components/ArticleList';
import qs from 'qs';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/router';
import { debounce } from '@/utils';


// const inter = Inter({ subsets: ['latin'] })
interface IPropTypes {
  categories : {
    items : ICategory[];
  },
  articles : {
    items : IArticle[];
    pagination : IPagination;
  };
}



const Home: NextPage<IPropTypes> = ({categories, articles})=> {
  // console.log("Categories", categories);
  const router = useRouter();
  const { page, pageCount } = articles.pagination;

  const handleSearch = (query : string) => {
    router.push(`/?search=${query}`);
  }
  return (
    <div>
      <Head>
        <title>Coders Blog</title>
        <meta 
          name='description'
          content='Created by next js app'
        />
        <link rel = "icon" href = "/favicon.ico"/>

      </Head>
      {/* Tabs */}
      <Tabs categories={categories.items} handleOnSearch={debounce(handleSearch, 500)} />

      {/* Articles */}
      <ArticleList articles = {articles.items}/>
      
      <Pagination page = {page} pageCount={pageCount}/>
      
    </div>
  )
}

// Since blog needs rendering  thats why I am using this function , it works only in pages folder , it tells nextjs that this component needs server side rendering 
export const getServerSideProps: GetServerSideProps = async ({query}) => {   // this function has special type GetServerSideProps 
  console.log(query)

  const options : Partial<IQueryOptions>= {
    populate : ['author.avatar'],
    sort : ['id:desc'],
    pagination : {
      page : query.page ? +query.page : 1, 
      pageSize : 3,
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
  const {data : articles,} : AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  // categories

  const { 
      data: categories,
    }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
    // console.log("categories-> ",categories);
  return {
    props: {
      categories: {  // to fetch categories we are using axios
        items: categories.data
      },
      articles : {
        items : articles.data,
        pagination : articles.meta.pagination
      }
    }
  }

}
export default Home

// http://127.0.0.1:1337