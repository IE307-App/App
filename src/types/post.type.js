// PostPayload object shape
const PostPayload = {
    caption: "", // string
    image: "", // string
  };
  
  // Post object shape
  const Post = {
    id: 0, // number
    title: "", // string
    caption: "", // string
    image: "", // string
    createdAt: new Date(), // Date
    updatedAt: new Date(), // Date
    user: {
      id: "", // string
      username: "", // string
      email: "", // string
      name: "", // string
      imageurl: "", // string
      mobile: "", // string
      userBio: "", // string
    },
    likeByUser: [
      {
        userName: "", // string
        name: "", // string
        email: "", // string
        imageurl: "", // string
        userId: 0, // number
      }
    ],
    comments: 0, // number
  };
  