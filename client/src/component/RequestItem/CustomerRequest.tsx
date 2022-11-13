import React, { useState } from "react";
import style from "./CustomerRequest.module.css";
import AdditionSvg from "../../assets/addition.svg";
import DeleteSvg from "../../assets/delete.svg";
import ArrowDownSvg from "../../assets/arrow_down.svg";
import ArrowUpSvg from "../../assets/arrow_up.svg";
import { TCustomerRequest } from "../../type";
import { useAppDispatch } from "../../store/hooks";
import { deleteCustomerRequestAPI } from "../../api";
import { setSpecificCustomerRequestList } from "../../store/slice/CustomerRequestSlice";
import {
  setOpenSnackBar,
  setSnackBarMsg,
} from "../../store/slice/SnackBarSlice";

type TProps = {
  answered: boolean;
  dataIdx: number;
  data: TCustomerRequest;
};
export default function CustomerRequest({ answered, data, dataIdx }: TProps) {
  // STORE STATE
  const dispatch = useAppDispatch();

  // LOCAL STATE
  const [openDetail, setOpenDetail] = useState(false);

  const onClickDeleteCustomerRequest = (requestInfo: TCustomerRequest) => {
    deleteCustomerRequestAPI({
      customerId: requestInfo.customerId,
      requestId: requestInfo.id,
    }).then(
      (
        res: {
          success: boolean;
          message: string;
          resultData: TCustomerRequest[];
        } | null
      ) => {
        if (res?.success) {
          dispatch(setSpecificCustomerRequestList(res.resultData));
          dispatch(setOpenSnackBar(true));
          dispatch(setSnackBarMsg(res.message));
        } else {
          if (res?.message) {
            dispatch(setOpenSnackBar(true));
            dispatch(setSnackBarMsg(res.message));
          } else {
            dispatch(setOpenSnackBar(true));
            dispatch(setSnackBarMsg("API 요청으로 부터 문제가 발생 했습니다."));
          }
        }
      }
    );
  };
  return (
    <div className={style.wrapper}>
      <div className={style.titleSection}>
        <div className={style.titleNum}>{dataIdx}</div>
        <div className={style.title}>{data.title}</div>
        <div className={style.optionGroup}>
          {!answered && (
            <div
              className={style.addButton}
              onClick={() => {
                onClickDeleteCustomerRequest(data);
              }}
            >
              <img src={DeleteSvg} alt="delete_icon" />
              삭제
            </div>
          )}
        </div>
      </div>
      {/* titleSection END */}
      <div className={style.requestDescription}>
        <div>{data.contents}</div>
        <div className={style.writtenDate}>
          {`작성날짜: ${new Date(data.createdDateTime).toLocaleString(
            "ko-KR"
          )}`}
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
    </div>
  );
}
