// import getCurrentUser from "./actions/getCurrentUser";
// import getPosts, { IPostsParams } from "./actions/getPosts";
// import Container from "./components/Container";
// import EmptyState from "./components/EmptyState";
// import PostCard from "./components/posts/PostCard";

// interface HomeParams{
//   searchParams: IPostsParams
// }

// const Home = async({searchParams}: HomeParams)=> {

//   const params: IPostsParams = { 
//     ...searchParams, 
//     userId: searchParams.userId ?? null 
//   };

//   const posts = await getPosts(params);
//   const currentUser = await getCurrentUser();

//   if(posts.length === 0){
//     return (
//       <EmptyState showReset/>
//     )
//   }

//   return (
//     <Container>
//       <div className="
//         pt-24
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         md:grid-cols-3
//         lg:grid-cols-4
//         xl:grid-cols-5
//         2xl:grid-cols-6
//         gap-8
//       ">
//         {posts.map((post)=>{
//           return(
//             <PostCard
//               currentUser={currentUser}
//               key={post.id}
//               data={post}
//             />
//           )
//         })}
//       </div>
//     </Container>
//   )
// }

// export default Home;
import getCurrentUser from "./actions/getCurrentUser";
import getPosts, { IPostsParams } from "./actions/getPosts";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import PostCard from "./components/posts/PostCard";

interface HomeParams{
  searchParams: IPostsParams
}


const Home = async({searchParams}: HomeParams)=> {

  const userId = searchParams.userId ?? undefined;
  const posts = await getPosts({ ...searchParams, userId });
  const currentUser = await getCurrentUser();
  if(posts.length === 0){
    return (
      <EmptyState showReset/>
    )
  }

  return (
    <Container>
      <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {posts.map((post)=>{
          return(
            <PostCard
              currentUser={currentUser}
              key={post.id}
              data={post}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default Home;

