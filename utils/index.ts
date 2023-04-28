import { IArticle } from "@/types";
import { serialize } from "next-mdx-remote/serialize";

export const formatDate = (dateString : string) : string =>{
    const date = new Date(dateString).toLocaleDateString('en-US',{
        weekday : "long",
        year : "numeric",
        month : "long",
        day : "numeric"
    });
    return date;
}

export const removeDash = (slug : string) : string => {
    if(typeof slug === 'string'){
        // 'node-js' => ['node','js'] => node js
        return slug.split('-').join(' ')
    }
    return '';
}

export const capitalizeFirstLetter = (str : string) : string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// instead of this debounced function we can also use lodash
export const debounce = (fn : (query : string) => void, timeout = 300) => {
    // this function helps in searching -> when we type anything slowly it rerenders again , but when w type it fast in given time frame -> it renders only once 
    let timer : NodeJS.Timeout;

    const debounced = (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, timeout)
    }

    return debounced;
}


export const serializeMarkdown = async (item : IArticle) => {
    const body = await serialize(item.attributes.body as string);
    return {
        ...item,
        attributes : {
            ...item.attributes,
            body,
        }
    }
}