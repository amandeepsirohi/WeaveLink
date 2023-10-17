import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast
} from "@chakra-ui/react"
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom.js";
import {BsInstagram} from "react-icons/bs";
import {CgMoreO} from "react-icons/cg";
import {Link as RouterLink} from "react-router-dom"
import { useState } from "react";
import useShowToast from '../hooks/useShowToast';

const UserHeader = ({user}) => {
    const toast = useToast(); 
    const currentUser = useRecoilValue(userAtom);
    const [following , setFollowing] = useState(user.followers.includes(currentUser?._id));
    const showToast = useShowToast();
    const [updating , setUpdating] = useState(false);

    const copyURL = () =>{
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title:"Seccessful!!",
                status:"success",
                description:"Link Copied",
                duration:3000,
                isClosable:true
            });
        });
    }

    const handleFollowUnfollow = async () => {
      if(!currentUser)
      {
        showToast("Error" , "Please login to follow" , "error");
        return;
      }
      if(updating) return;
      setUpdating(true);
      try {
        const res = await fetch(`/api/users/follow/${user._id}` , {
          method:"POST",
          headers:{
            "Content_Type":"application/json",
          }
        })
        const data = await res.json();
        if(data.error)
        {
          showToast("Error" , error , "error");
          return;
        }

        if(following)
        {
          showToast("Success" , `Unfollowed ${user.username} Successfully` , "success");
          user.followers.pop();
        }
        else{
          showToast("Success" , `Followed ${user.username} Successfully` , "success");
          user.followers.push();
        }
        setFollowing(!following);


        console.log(data);
      } catch (error) {
          showToast("Error" , error , "error");
      } finally{
        setUpdating(false);
      }
    }

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"white"}
              p={1}
              borderRadius={"full"}>
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar name="{user.name}" src={user.profilePic} size={
            {
              base:"md",
              md:"xl"
            }
          }/>
          )}
          {!user.profilePic && (
            <Avatar name="{user.name}" src="https://bit.ly/broken-link" size={
            {
              base:"md",
              md:"xl"
            }
          }/>
          )}
        </Box>
      </Flex>
      <Text>
      {user.bio}</Text>
      {currentUser?._id === user._id && (
				<Link as={RouterLink} to='/update'>
					<Button size={"sm"}>Update Profile</Button>
				</Link>
			)}
			{currentUser?._id !== user._id && (
				<Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
					{following ? "Unfollow" : "Follow"}
				</Button>
			)}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} Followers</Text>
          <Box w="1" h="1" bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"}/>
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"}/>
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"} p={"1px"}>
                <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
            <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} pb="3" color={"gray.light"} cursor={"pointer"}>
            <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader