import React, { useState } from 'react';
import { Form, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm({ onCreatedPost }) {
  const [postBody, setPostBody] = useState('');

  const [createPost, { error, loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: { body: postBody },
    refetchQueries: [{query: FETCH_POSTS_QUERY}]
  });

  function createPostCallback() {
    if (!postBody || loading)
      return;

    createPost();
    setPostBody('');
  }

  return (
    <React.Fragment>
      <Form style={{ width: '50%', display: 'block', margin: 'auto' }}>
        <Form.Field
        >
          <Form.Input
            icon={
              <Icon name='plus circle' color="teal" inverted circular link={!loading} onClick={createPostCallback} />
            }
            placeholder="Write a post..."
            name="body"
            onChange={(e) => setPostBody(e.target.value)}
            value={postBody}
            error={error ? true : false}
          />
        </Form.Field>
      </Form>
    </React.Fragment>

  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
