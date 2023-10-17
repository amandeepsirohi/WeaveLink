import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom";
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Post from '../components/Post.jsx';
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from '../atom/postsAtom';

const UserPage = () => {

  const {username} = useParams();
  const showToast = useShowToast();
  const {loading , user} = useGetUserProfile();
  const [posts ,setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts , setFetchingPosts] = useState(true);

  useEffect(() => {
   

    const getPosts = async() => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        setPosts(data);
        
      } catch (error) {
        showToast("Error" , error.message , "error");
        setPosts([]);
      }finally{
        setFetchingPosts(false);
      }
    }


    getPosts();
  } , [username ,showToast , setPosts]);

  if(!user && loading){
    return (
      <Flex justifyContent ={"center"}>
        <Spinner size="xl" />
      </Flex>
    )
  }

  if(!user && !loading) return <h1>User not found</h1>

  if(!user) return null;

  return (
    <div>
      <UserHeader user={user}/>
      
      {!fetchingPosts && posts.length === 0 && <Text justifyContent={"center"} mt={10} 
      textAlign={"center"} fontSize={"20px"}>Not posted anything yet</Text> }

      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy ={post.postedBy} />
      ))}
    </div>
  )
}

export default UserPage