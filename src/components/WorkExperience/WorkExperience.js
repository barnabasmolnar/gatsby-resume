import React from "react";
import WorkItem from "./WorkItem";
import { useStaticQuery, graphql } from "gatsby";

const WorkExperience = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(graphql`
    query JobsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/jobs/" } }
        sort: { fields: frontmatter___sortOrder }
      ) {
        edges {
          node {
            id
            frontmatter {
              company
              title
              duration
              isFullTime
              place
            }
            html
          }
        }
      }
    }
  `);

  const jobs = edges.map(
    ({ node: { id, html: description, frontmatter } }) => ({
      id,
      description,
      ...frontmatter,
    })
  );

  return (
    <>
      <div className="relative inline-block">
        <h2 className="relative z-10 mb-2 text-3xl font-bold text-indigo-700">
          Work experience
        </h2>
        <div className="absolute z-0 w-full h-3 bg-purple-200 opacity-50 bottom-3"></div>
      </div>
      <ul>
        {jobs.map(job => (
          <WorkItem key={job.id} {...job} />
        ))}
      </ul>
    </>
  );
};

export default WorkExperience;
