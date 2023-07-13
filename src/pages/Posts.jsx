import React, { useEffect, useRef, useState } from "react";

import MyModal from "../components/UI/modal/MyModal"
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";

import { usePosts } from "../components/hooks/usePosts";

import PostService from "../API/PostService";

import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import { useFetching } from "../components/hooks/useFetching";
import { getPageCount } from "../utils/pages";
// import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../components/hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const lastElement = useRef();

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1);
	})

	useEffect(() => {
		fetchPosts(limit, page);
		// eslint-disable-next-line
	}, [page, limit])

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<MyButton 
				style={{marginTop: '30px'}} 
				onClick={() => setModal(true)}>
				Добавить пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost}/>
			</MyModal>
			<hr style={{margin: ' 15px 0'}}/>
			<PostFilter 
				filter={filter}
				setFilter={setFilter}
			/>
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultVaule="Кол-во элементов на странице"
				options={[
					{value: 5, name: '5'},
					{value: 10, name: '10'},
					{value: 25, name: '25'},
					{value: -1, name: 'Показать все'}
				]}
			/>
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			}
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
			<div ref={lastElement} style={{height: '20px'}}></div> 
			{isPostsLoading &&
				<div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
			} 
			{/* Pagination */}
			{/* <Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/> */}
		</div>
	);
}

export default Posts;