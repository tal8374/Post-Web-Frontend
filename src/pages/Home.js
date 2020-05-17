import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import Loader from '../components/Loader';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(data)

  return (

    loading ?
      (
        <Loader text={"Loading posts..."} />
      ) :
      <React.Fragment>
        {user && <PostForm />}
        <Grid columns={3}>
          <Grid.Row className="page-title">
            <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
            <Transition.Group>
              {data && data.posts &&
                data.posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          </Grid.Row>
        </Grid>
      </React.Fragment>

  );
}

export default Home;
