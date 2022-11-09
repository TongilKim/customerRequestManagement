import React, { Fragment, useCallback, useState } from "react";
import style from "./CounselorRequest.module.css";
import AdditionSvg from "../../assets/addition.svg";
import DeleteSvg from "../../assets/delete.svg";
import ArrowDownSvg from "../../assets/arrow_down.svg";
import ArrowUpSvg from "../../assets/arrow_up.svg";
import WritingModal from "../Modal/WritingModal";
import { Role } from "../../type";

type TProps = {
  answered: boolean;
};
export default function CounselorRequest({ answered }: TProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openWritingModal, setOpenWritingModal] = useState(false);

  const closeModal = useCallback(() => {
    setOpenWritingModal(false);
  }, [openWritingModal]);

  return (
    <div className={style.wrapper}>
      <div className={style.titleSection}>
        <div className={style.titleNum}>1</div>
        <div className={style.title}>문의요청 타이틀 입니다.</div>
        <div className={style.optionGroup}>
          {!answered && (
            <Fragment>
              <div
                className={style.addButton}
                onClick={() => {
                  setOpenWritingModal(true);
                }}
              >
                <img src={AdditionSvg} alt="delete_icon" />
                답변
              </div>
              <div className={style.addButton}>
                <img src={AdditionSvg} alt="delete_icon" />
                담당자 본인 지정
              </div>
            </Fragment>
          )}
        </div>
      </div>
      {/* titleSection END */}
      <div className={style.requestDescription}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
        <div className={style.writtenDate}>
          <div>고객 아이디: kkimtt</div>
          <div>작성날짜: 2022/11/09</div>
        </div>
      </div>
      {answered && (
        <div
          className={style.expandDetail}
          onClick={() => {
            setOpenDetail(!openDetail);
          }}
        >
          답변내용
          <img src={openDetail ? ArrowDownSvg : ArrowUpSvg} alt="arrowIcon" />
        </div>
      )}

      {openDetail && (
        <div className={style.detailDescription}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className={style.answeredDate}>상담사: 김통일</div>
          <div className={style.answeredDate}>작성날짜: 2022/11/09</div>
        </div>
      )}
      {openWritingModal && (
        <WritingModal role={Role.CounselorRole} closeModal={closeModal} />
      )}
    </div>
  );
}
