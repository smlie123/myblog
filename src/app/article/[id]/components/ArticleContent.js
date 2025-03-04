'use client';

import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import 'react-quill-new/dist/quill.snow.css';

export default function ArticleContent({ content }) {
    useEffect(() => {
        hljs.highlightAll();
        console.log('hljs')
    }, [content]);



    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
}