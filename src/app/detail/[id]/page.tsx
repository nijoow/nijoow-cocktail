import DetailViewer from "@/components/detail/DetailViewer";
import Link from "next/link";
import React from "react";

const DetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Link className="self-start m-4 btn btn-sm" type="button" href={"/"}>
        BACK
      </Link>
      <DetailViewer id={params.id} />
    </>
  );
};

export default DetailPage;
