import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atom/userAtom';
import useShowToast from '../hooks/useShowToast';
import postsAtom from "../atom/postsAtom";
import { useParams } from 'react-router-dom';

const MAX_CHAR = 500;

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const showToast = useShowToast();
    const [postText , setPostText] = useState("");
    const [remainingChar , setRemainingChar] = useState(MAX_CHAR);
    const {handleImageChange , imgUrl ,setImgUrl} = usePreviewImg();
    const user = useRecoilValue(userAtom);
    const [loading , setLoading] = useState(false);
    const [posts ,setPosts] = useRecoilState(postsAtom);
    const {username} = useParams();

    const handleTextChange = (e) => {
        const inputText = e.target.value;

        if(inputText.length > MAX_CHAR) {
            const truncatedText = inputText.slice(0 , MAX_CHAR);
            setPostText(truncatedText);
            setRemainingChar(0);
        }
        else{
            setPostText(inputText);
            setRemainingChar(MAX_CHAR - inputText.length);
        }
    }
    const imageRef = useRef(null);

    const handleCreatePost = async() => {
        setLoading(true)
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
            });
    
              const data = await res.json();
              if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success" , "Post created successfully!!" , "success");
            if(username === user.username)
            {
                setPosts([data , ...posts]);
            }
            onClose();
            setImgUrl("");
            setPostText("");
        } catch (error) {
            showToast("Error" , error, "error");
        }
        finally{
            setLoading(false);
        }
    }

  return (
   <>
     <Button position={"fixed"} bottom={10} right={10}
     leftIcon={<AddIcon/>}
     bg={useColorModeValue("gray.300" , "gray.dark")} onClick={onOpen}>
        New Post
     </Button>
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
                <Textarea 
                    placeContent={"Enter content here.."}
                    onChange={handleTextChange}
                    value={postText}
                />
                <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"right"} m={1} color={useColorModeValue("black" , "white")} >
                    {remainingChar}/{MAX_CHAR}
                </Text>
                <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
                <BsFillImageFill style={{ marginLeft: "5px", cursor: "pointer" }} size={16}
								onClick={() => imageRef.current.click()}/>
            </FormControl>

            {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"} >
                    <Image src={imgUrl} />
                    <CloseButton onClick={() => {
                        setImgUrl("")
                    }} bg={"gray.800"} position={"absolute"} top={2} right={2}/> 
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

   </>
  )
}

export default CreatePost