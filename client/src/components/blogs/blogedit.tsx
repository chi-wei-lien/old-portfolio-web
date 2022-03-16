//import custom react element
import MyNavbar from '../navbar/navbar';
import axios from "axios";
import Error from '../error/error';

import { Container, Form, Button } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';

import '../../style/blogs/blogedit.css';

//import boostrap css
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const check = () => {
  let token = {
    token: localStorage.getItem('token')
  }
  let checkApiAddress = "https://chi-wei-lien.herokuapp.com/api/login/check";

  if (process.env.REACT_APP_ENV?.localeCompare("dev") == 0) {
    checkApiAddress = "http://localhost:5000/api/login/check";
  }

  axios.post(checkApiAddress, token, {
    withCredentials: true
  })
    .catch(err => {
    document.location.href="/error"
    });
}


const BlogEdit = () => {
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [pic, setPic] = useState<string>('');
  const [preview, setPreview] = useState<string>('');

  check();

  let id = window.location.pathname;
  id = id.slice(id.indexOf('edit/') + 5);

  React.useEffect(() => {
    let loadApiAddress = "https://chi-wei-lien.herokuapp.com/api/blogs/edit/" + id;
    if (process.env.REACT_APP_ENV?.localeCompare("dev") == 0) {
      loadApiAddress = "http://localhost:5000/api/blogs/edit/" + id;
    }
    let token = {
      token: localStorage.getItem('token')
    }
    axios.post(loadApiAddress, token, {
      withCredentials: true
    })
      .then(res => {
        setTitle(res.data[0].title);
        setContent(res.data[0].content);
        setPic(res.data[0].pic);
        setPreview(res.data[0].preview);
      })
  }, []);

  const handleSubmit = async (event: any) => {
    let saveApiAddress = "https://chi-wei-lien.herokuapp.com/api/blogs/save";
    if (process.env.REACT_APP_ENV?.localeCompare("dev") == 0) {
      saveApiAddress = "http://localhost:5000/api/blogs/save";
    }
    event.preventDefault();
    let blog = {
      blogTitle: title,
      blogContent: content,
      blogPic: pic,
      token: localStorage.getItem('token'),
      id: id,
      blogPreview: preview
    }
    await axios.post(saveApiAddress, blog, {
      withCredentials: true
    })
      .then(res => {
        alert('your blog is successfully saved');
      })
  }

  const handleChange = (content: string) => {
    setContent(content);
  }

  return (
    <>
      <MyNavbar />
        <Container>
        <Form onSubmit={handleSubmit} className="editor-container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Journal Name</Form.Label>
            <Form.Control 
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Journal Name"
              value={title} />
            <Form.Text className="text-muted">
              Name that will be displayed to the readers
            </Form.Text>
            <br />
            <Form.Label>Preview Text</Form.Label>
            <Form.Control 
              onChange={(e) => setPreview(e.target.value)}
              type="text"
              placeholder="Enter Preview Text"
              value={preview} />
            <Form.Text className="text-muted">
              Name that will be displayed to the readers
            </Form.Text>
            <br />
            <Form.Label>Blog Picture Source</Form.Label>
            <Form.Control 
              onChange={(e) => setPic(e.target.value)}
              type="text"
              placeholder="Picture Source"
              value={pic} />
            <Form.Text className="text-muted">
              Picture that will be displayed to the readers
            </Form.Text>
          </Form.Group>
          <Editor
            apiKey="83y8lsfnuk86q6vm9llhy54rxn9c9oa2z8ttovkq59fix13d"
            onEditorChange={handleChange}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount code table blockquote'
              ],
              toolbar: 'undo redo | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help | styleselect | link image | code| table | blockquote',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
            value={content}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default BlogEdit;