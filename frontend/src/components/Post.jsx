import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useSafeLayoutEffect
} from "@chakra-ui/react"
import {Link, useNavigate} from "react-router-dom"
import {BsThreeDots} from "react-icons/bs"
import Actions from './Actions';
import {useEffect, useState} from "react";
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from '@chakra-ui/icons';
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom";
import postsAtom from '../atom/postsAtom';

const Post = ({post , postedBy }) => {
    const showToast =  useShowToast();
    const [user , setUser] = useState(null);
    const [posts ,setPosts] = useRecoilState(postsAtom);
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async() => {

            try {

                const res = await fetch("/api/users/profile/" + postedBy)
                const data = await res.json();
                if(data.error)
                {
                    showToast("Error" , data.error , "error");
                }
                setUser(data);
                
            } catch (error) {
                showToast("Error" ,error.message , "error");
                setUser(null);
            }

        }

        getUser();
    } , [postedBy , showToast]); 

    const handleDeletePost = async(e) => {

      try {
        e.preventDefault();
        if(!window.confirm("Delete this post (This action will not be reversed) !!")) return;
        
        const res = await fetch(`/api/posts/${post._id}` , {
          method:"DELETE",
        })
        const data = await res.json();
        if(data.error)
        {
          showToast("Error" , data.error , "error");
          return;
        }
        showToast("Success" , "Post Deleted Successfully!!" , "success");
        setPosts(posts.filter((p) => p._id !== post._id)); 
        
      } catch (error) {
        showToast("Error" , error.message , "error");
      }
    }

  return (
    <Link to={`/${user?.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name={user?.name} src={user?.profilePic}
            onClick={(e) => {
							e.preventDefault();
							navigate(`/${user?.username}`);
						}}
          />
          <Box w="1px" h="full" bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
          {post.replies.length === 0 && <Text ml={4} alignItems={"center"}>🥱</Text>}
          {post.replies[0] && (
            <Avatar
              size={"xs"}
              name={post.replies[0].username}
              src="data:image/jpeg;base64,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"

              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}/>
          )}
            {post.replies[1] && (
                <Avatar
              size={"xs"}
              name={post.replies[1].username}
              src="https://hips.hearstapps.com/hmg-prod/images/snoop_dogg_photo_by_estevan_oriol_archive_photos_getty_455616412.jpg"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}/>
            )}
            
            {post.replies[2] && (
                <Avatar
              size={"xs"}
              name={post.replies[2].username}
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AhwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xAA3EAACAQMDAgQEBAUDBQAAAAABAgMABBEFEiExQQYTUWEUIjJxgZGh0QcjQlKxFcHwJFNisuH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Aym2lAqTbS7aCMLTgtP24pwWgYcBSWOAOeazOqai16+xDiAdAP6vc1Z+Ibgx26W6HmXlvtVDGmTQMVM1MkBPajLa3VyO9WMVmAAQKCn+HbH00w27Z6Vohbccio3t19P0oM80BA54qMx81dXFuMcgUA8XNAIpeJxJGSrjoR2rUaJq/xmILggT9vRx+9Zx1xUJ3xuHQlWU5BHY0HoGK40PpV2L6ySYH5sYcejDr+9FEUDKSn4rqAXFLtp+M04CgjC05RT8U2ZvKglf+1Cf0oMnqs3xGoSsPoU7F+w/+1FEMtzUCHK5PU8miIu1BbWadNoFWcaMQBnaBVValjgA4q4gRtuQhIoJo1j6lmb2C1Dcsp+hNuO45NEK0nASHkjvSiwurgn+gdzigoblGIOSf8VXSVqrnRGWMuSxwO9UVxaKpOWGaCrYVDIuRRU0ZB45FDsM0Fn4UuRDePbN0n5H3A/atWRWBs5DBeQz5wY3B/DvW/B3AEdMcUDD1padiuoIMV2KdXUHAVBqIP+n3O0c+U2PyNECkmXfE6f3KRQYOP6aIhA4JOBmoEXYGQ9VODUtrG0rcY9jQWtncQxyLvOR7Vr9NvbCVAFOCB0IrH22jz3DAQnLVO2m6hp7eY0bFRzlef8UHoQt7N1GxyD3NNu5La1tWIOWzWP03Wn3rG+TyOvaitdmZJMK42uoPB7UAGsarc3EmFkJQH5UU4FBrp13cDzWidc9zxRsG21gS6VVJf6S46Us+oagnxCSSzxSQR+a0cwERK7c8DaT6fnQU1xYyLxkBh6UA8bIcMDn1NWd+L6COCe9jZVuVDxtkEkfYUxkaaPLDmgqJVwcjvW60yXztOtpO5jXP3xWLuU2jPpV9pOqw29rbWzLIeMM4HCk0GgxXU3eO1JQQ5rt1RbqXNBKGpd3BqHdTgaDJajF5Oo3CYwC24fY0sb+RAAPXJNHa+IvOQq2ZeAy+3agfL8xOKAuG5uFhEzxyC0aTZvBIUH8OTV1b2i3EE88c9tGkbqsa5fdNlckrjPQnB4xVfpcNyYPhEnkEDfVHk7T+FaYRw6dalo8NMRySKDKSQzJflZo/LYHpnOKtLxfMt1z1A61VXEzNcyMzZbPJoxZHaAEhsYxmgdpcyxXC+cZAQCI2RyDHn0q9Onf6uVkvLv4iRFxG83JA++OazAk2yK2c81s7aFxbxyoCFYDFBntU0q5kuC9w7TH+8sTQM0TRA5XgVszHvzvPHXmqPVxGikKOaDJXADOPej9PhiaUIGDAqTz2IP7UDc8NxVtaBFsluOPNiAb2IPyn/NBaq3yj7V1QRyZjUnqRXUHZrs0ldQOzTlPSmUooKTXbZln+IU8MOfwqPTwGfnpVrqiB7NyRnaM1SWrlTwaDVWGExt6+tHpbPONzdx3qi02clxk1sLIg22Fx05oMTPp0slxO0KlljbDEDgVqNJGlDTwl1HlsYLZx2qh1OYRTXFqs8sUMjlmaIfNz2/Oh7CO0MO2e6lwpJ2k8n2zQTfEaNHdyw3LsCxwgHP51qPDcpa2ktnYukZ/lk+h5xWMn1O1WX/p0VFIxkoDVho2pNDl4337jyO35UGn1ACNW2kisfqUzMxGeM96vZNSS4UhiAxrO6gcsaCruBuOc1LaPI8bRqflb5dvsaik5NEaZgbz34oLVWAGB0FdUOaWgJFLSUtB1OFNpM0DpFEkbIehHNZdQUkK+hwa1CnnrWfv4vKvZVxwTlfx5oCrGTbgj0q4bVXhtyIzhm4zWegOKklJYgD0NBHc3Uk77YSSzHk+tF2+lxxQj4guzfUSp6GmwQeWoZRzjj3NE2+64kCSpK0Y/7bBST9z0oCJtPsY4vI8oAKR9Ryxzzn9arZNPEUm63f8AH+2r+eATRvENPRWIA+IllaRlHbGMAfrVX8P8ORukYOD0UnJoIB5sTFJSNw5HvTZ33rk0XeoBKkzAqp4YZ6D1oKfIYAc0A0i4UmpdPBCOfU1zqNmKlt12RAUE4rqQV1AdXZpM5pKBxNJ0ptLQPBoPVLYyRiZBl06j1FFLUowRg0GdTleOtTJjaS3YGuyhu5YujBj+VOMZww7UE8BzACH6gZqZbia2AZUDgdgMVTLcG3Zo89KMtbvfjedpJxu7A0Fguqatdtst4lQdyeoFNZJ7WMy3RBkY9e9OQXBhLxXDZ3YIUY/51oO4yqsGmEp6rk9qBLy/SRNqkE47imyncciqy4UKx25x/irG3JaJWx7c0DZThOnJqSE5jX7U24TOfWktj/L5+1AQDXU3vXUFhSGuJpDQL2rgabS5HrQPXrUsal2CqCWPAAHJ+1WOheH73WPmiXy7foZmHB+3rV54nt7bwh4ekubNN17MwhhkbkhiDyPTgGg8tuY2S+nVhhlkIPsc0bHLuTbNnP8AcP8AegYUOeSSRwSTnmi1B7UAN/EYps/UGGQw6Go1lAQj160ZPEXXaR06GgjC4zhc4oLL41vL3qxBxnA9aDml+VCPqNMjSYDG3tUos5pSM4UetAMzZY7ifmHNWlkp8lQ3UCoFsVj5I3H1o+3Tao9aCOYfJ9qI0nUpLS3uVaCK7tY8SSW0q/UpOCVbqpBxUcy8EUzSsfEXityrWUy/jt4/XFBuNO8MaP4i02O/0iaa3R+GjJ3GNu6nP711S/wZEiXWrWpOYikUiqegbLAn8sflSUGRpKUmtb4Z8D3mrbZ74SWtoe2MO49vQe5oMzp9hdajcrb2ULTSHnCj6R6k9hXofhv+H6W5WfWCJpBgiJc7B7e9bTR9EsdItvIs4FjXqcdWPqT3NWAXPJ6dhQAw2aRrtiQIoGAoHQelZL+KGjPe+HoZYV3PZ3kU+PVclW/Rv0reACmTwJPE8UqB0cFWUjqDQfLbx+VczIARtkK456Z460VEm4VdeNdEGi601upYoPkVjn5gACp++D+lVcKYoG+VmozBzVjHHu6U2SEg9KAaKAegxRghQINo5qJUPapVD9KAe4jAPSnxx/KKc8WTyTmp9oRPegBnHBqHSot1zeHP0WcjEd+1EyrkHFLpSErqSxrvlkgEMad2Z2AA/Gg9E/g/Y4t9TvWU4kdIU+ygk/8At+ldWz8LaQNE0K1sePNRN0rD+qQ8t+ppKCm8L+BrTSglzf4uLscgY+VPt71tETimp8zn2qXGBQNYZIHankYUikUc089KCNRxS4rh1p1BnNX0Oz1PUbi11CLfBeWyjI4ZXjJ+YH1wwrzDxF4Lv9Akd9puLLOVuEHAH/kOx9+ley6kfKNtMvVJwv4N8p/z+lF4BBBAx0PvQfOigoc9qnzuX1r1nXfAWm6kzTWR+BuDziNQY2Puv7YrzvxF4euvDs0YuZIJEc4UxFufuCP96CmDAHkCp41VhnpSmNHAxwSPSibSBTwSTigCdCT8q5qJxjCmtCsMSqSQSMUVofg6fXXNxHdQwW4ODlSzflwP1oMqbYlQFUlm4AAySa2/8O/Ctzpmum51BAJGtlmEJ6x5Yhc+/BPt962mg+FdN0X+ZCjTXCjmebBb8B0H4UfaxL8deTj6mKp+Cj9yaAnAArqdXUH/2Q=="
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}/>
            )}
            
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex>
              <Text fontSize={"sm"}
              onClick={(e) => {
							e.preventDefault();
							navigate(`/${user?.username}`);
						}}>{user?.username}</Text>
              <Image src="/verified.png" w={4} h={4} ml={1} mt={1}/>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(post.createdAt))} ago
							</Text>

              {currentUser?._id === user?._id && (
                <DeleteIcon size={20}  onClick={handleDeletePost}/>
              )}
              
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box borderRadius={6} overflow={"hidden"}>
              <Image src={post.img} w={"full"}/>
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions post={post}/>
          </Flex>
          
        </Flex>
      </Flex>
    </Link>
  )
}

export default Post