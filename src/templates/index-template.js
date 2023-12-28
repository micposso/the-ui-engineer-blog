import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Tags from "../components/tags";
import PostList from '../components/post-list';
import styled from 'styled-components';
import StyledLink from '../components/styled-link';

const HomePage = ({ data, postsProp }) => {
  const posts = data.allMarkdownRemark.nodes;
  const intro = data.markdownRemark.html;
  const title = data.markdownRemark.frontmatter.title;
  const tags = data.markdownRemark.tags;

  console.log("ttttt", tags)
  return (
    <Layout title={title}>
      <Tags tags={tags} />
      <Intro
        dangerouslySetInnerHTML={{
          __html: intro,
        }}
      />

      <PostList posts={posts} />
      <StyledLink
        css={`
          display: block;
          margin-top: var(--size-800);
          margin-bottom: var(--size-800);
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
        `}
        to="/blog"
      >
        View All posts
      </StyledLink>
    </Layout>
  );
};

export default HomePage;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  align-items: left;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--size-800);
  margin-bottom: var(--size-900);
  text-align: left;
  font-family: "Noto Serif", serif;
  font-style: italic;
  font-weight: 300;

  & p {
    text-transform: capitalize;
    font-size: var(--size-400);
    font-family: "Source Sans Pro", monospace;
    font-style: normal;
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 9
    ) {
      nodes {
        fields {
          slug
        }
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
          tags
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
      }
    }
  }
`;
