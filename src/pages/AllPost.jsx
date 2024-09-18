import { useState, useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from '../components/PostCard'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => { }, [])

    appwriteService.getPostsforCurrentUser([], userData).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts