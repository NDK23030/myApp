import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../components/hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';

const PostIdPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentByPostId(id);
        setComments(response.data);
    });
   
    useEffect(() => {
        fetchPostById(id);
        fetchComments(id);
    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {id}</h1>
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/> 
                : <div>
                    {comments.map(com => 
                        <div 
                            style={{marginTop: '15px'}}
                            key={com.id}>
                            <h5>{com.email}</h5>
                            <div>{com.body}</div>
                        </div>
                        )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;