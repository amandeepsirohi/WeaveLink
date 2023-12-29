import {Button, Center, Flex, Spinner, Text} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import useShowToast from '../hooks/useShowToast';
import Post from '../components/Post.jsx';
import { useRecoilState } from 'recoil';
import postsAtom from '../atom/postsAtom';


const HomePage = () => {
  const [posts , setPosts] = useRecoilState(postsAtom);
  const [loading , setLoading] = useState(true);
  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPosts = async() => {
      setLoading(true);
      setPosts([]);
      try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}

				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
    }
    getFeedPosts();
  }, [showToast , setPosts]);
  let new_data = Array.from(posts);
  console.log(typeof(data));
  return (
    <>
      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {!loading && posts.length === 0 && <Text mt={10} fontSize={'25px'} textAlign={'center'}>To see posts follow someone!</Text>}
      {new_data.map((post) => (
					<Post key={post._id} post={post} postedBy={post.postedBy} />
				))}
    </>
  )
}

export default HomePage;