import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
  useColorModeValue,
  useShortcut,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import postsAtom from "../atom/postsAtom";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const { pid } = useParams();

  const currentUser = useRecoilValue(userAtom);
  const currentPost = posts?.[0];

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("error", error.message, "Error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("error", error.message, "Error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  const handleDeletePost = async () => {
    try {
      if (
        !window.confirm(
          "Delete this post (This action will not be reversed) !!"
        )
      )
        return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post Deleted Successfully!!", "success");

      navigate(`/${user?.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user?.profilePic} size={"md"} name={user?.name} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user?.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} mt={1} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}>
            Just Now
          </Text>

          {currentUser?._id === user?._id && (
            <DeleteIcon
              size={20}
              cursor={"pointer"}
              onClick={handleDeletePost}
            />
          )}
        </Flex>
      </Flex>
      <Text my={4}>{currentPost?.text}</Text>
      <Box borderRadius={6} overflow={"hidden"}>
        <Image src={currentPost?.img} w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>
      {/* <Flex gap={3} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>{post?.replies.length} replies</Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} ></Box>
        <Text color={"gray.light"} fontSize={"sm"}>{post?.likes.length} likes</Text>
      </Flex> */}
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>
            get the app to like , reply and more fun
          </Text>
        </Flex>
        <Button bg={useColorModeValue("black", "gray.dark")}>
          <Text textColor={"white"}>Get</Text>
        </Button>
      </Flex>
      <Divider my={4} />
      {currentPost?.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost?.replies[currentPost?.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
};

export default PostPage;

export const timeAgo = (timestamp) => {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo}s ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo}m ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo}h ago`;
  } else if (secondsAgo < 604800) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo}d ago`;
  } else {
    const weeksAgo = Math.floor(secondsAgo / 604800); // 7 days in seconds
    return `${weeksAgo}w ago`;
  }
};
