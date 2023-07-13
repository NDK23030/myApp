import React, { useState, useMemo } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

import './styles/App.css';
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'аа', body: 'Description'},
		{id: 2, title: 'кк', body: 'Description'},
		{id: 3, title: 'ввв', body: 'Description'}
	]);
	const [filter, setFilter] = useState({sort: '', query: ''})

	const sortedPosts = useMemo(() => {
		if(filter.sort) {
			return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
		} 
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
	}, [filter.query, sortedPosts])

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	};

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
	<div className="App">
		<PostForm create={createPost}/>
		<hr style={{margin: ' 15px 0'}}/>
		<PostFilter 
			filter={filter}
			setFilter={setFilter}
		/>
		{sortedAndSearchedPosts.length
			? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
			: 
			<h1 style={{textAlign: "center"}}>
				Посты не найдены
			</h1>
		}	
	</div>
	);
}

export default App;
