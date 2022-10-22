import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from "react-icons/fa";

const NewsSummaryCard = ({ news }) => {
  const { _id, title, author, details, rating, total_view, image_url } = news;

  return (
    <Card className="mb-5">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex  justify-content-between align-items-center gap-3">
          <Image
            roundedCircle
            src={author?.img}
            style={{ height: "60px" }}
          ></Image>
          <div>
            <span>{author?.name}</span> <br />
            <span>{author?.published_date}</span>
          </div>
        </div>
        <div className="d-flex gap-3">
          <FaRegBookmark></FaRegBookmark>
          <FaShareAlt></FaShareAlt>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Img src={image_url} alt="Card image" />
        <Card.Text>
          {details.length > 250 ? (
            <>
              {details.slice(0, 250) + "..."}
              <Link to={`/news/${_id}`}> Read More </Link>
            </>
          ) : (
            <>{details}</>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer className=" d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <FaStar className="text-warning"></FaStar>
          <span>{rating?.number}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <FaEye></FaEye>
          <span>{total_view}</span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default NewsSummaryCard;
