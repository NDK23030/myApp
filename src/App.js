import React, { useEffect, useState } from "react";

import MyModal from "./components/UI/modal/MyModal";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

import { usePosts } from "./components/hooks/usePosts";

import PostService from "./API/PostService";

import './styles/App.css';
import MyButton from "./components/UI/button/MyButton";
import Loader from "./components/UI/loader/Loader";
import { useFetching } from "./components/hooks/useFetching";

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const posts = await PostService.getAll();
		setPosts(posts);
	})

	useEffect(() => {
		fetchPosts();
	}, [])

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<MyButton onClick={fetchPosts}>Нажми меня</MyButton>
			<MyButton 
				style={{marginTop: '30px'}} 
				onClick={() => setModal(true)}>
				Добавить пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost}/>
			</MyModal>
			<hr style={{margin: ' 15px 0'}}/>
			<PostFilter 
				filter={filter}
				setFilter={setFilter}
			/>
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			} 
			{isPostsLoading
				? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div> 
				: <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
			}
		</div>
	);
}

export default App;
