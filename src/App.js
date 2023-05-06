import axios from "axios";
import { useEffect, useState } from "react";
import { CardGroup, Container, Input, Card, CardHeader, CardBody, CardTitle, CardText, Button } from "reactstrap";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
      }
      );
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (selectedUser == 'all') {
          setPosts(res.data);
        }
        else {
          const newPosts = res.data.filter(e => e.userId == selectedUser);
          setPosts(newPosts)
        }

      })
  }
    ,
    [selectedUser]
  );

  return (
    <div className="App">
      <Container>
        <h1>Filtering user posts app</h1>
        <h3>Choose user</h3>
        <Input id="exampleSelect" name="select" type="select" onChange={(e) => setSelectedUser(e.target.value)}>
          <option value='all'>all</option>
          {users && users.map(e =>
            <option value={e.id} key={e.id}>
              {e.name}
            </option>)}
        </Input>

        <h3>Posts</h3>
        <div>
          {posts && posts.map(e =>
            <Card
              className="my-2"
              key={e.id}

            >
              <CardHeader>
                Posted by {e.userId}
              </CardHeader>
              <CardBody>
                <CardTitle tag="h5">
                  {e.title}
                </CardTitle>
                <CardText>
                  {e.body}
                </CardText>
              </CardBody>

            </Card>)}


        </div>
      </Container>
    </div>
  );
}

export default App;
