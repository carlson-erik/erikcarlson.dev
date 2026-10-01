import React from "react";
import styled from "styled-components";

// "YYYY-MM-DD" parses as midnight UTC. Formatting in UTC keeps it on the same day
// everywhere, so the server and the browser agree during hydration.
const dateWithYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const dateWithoutYear = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/* ------------------ Styled Components ------------------ */
// No separator character between the parts; the gap separates them.
const MetaLine = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1rem;
  font-size: 1rem;
  font-variant-numeric: lining-nums; /* Matches the post body's figures */
  color: ${(props) => props.theme.colors.mutedText};
`;

export interface PostMetaProps {
  /** Release date, "YYYY-MM-DD". */
  date: string;
  minutesToRead: number;
  /** Leave the year out, for posts listed under a year heading. */
  hideYear?: boolean;
}

/** A post's release date and read length: "September 12, 2026  8 minute read". */
const PostMeta = ({ date, minutesToRead, hideYear }: PostMetaProps) => {
  const format = hideYear ? dateWithoutYear : dateWithYear;
  return (
    <MetaLine>
      <time dateTime={date}>{format.format(new Date(date))}</time>
      <span>{`${minutesToRead} minute read`}</span>
    </MetaLine>
  );
};

export default PostMeta;
