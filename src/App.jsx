import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema 를 먼저 생성한다.
const loginSchema = yup.object({
  uid: yup.string().required("이름은 필수 입니다."),
  umail: yup
    .string()
    .email("유효한 이메일을 입력하세요.")
    .required("이메일은 필수 입니다."),
  upw: yup
    .string()
    .min(4, "비밀번호는 최소 4자리입니다.")
    .required("비밀번호는 필수 입니다."),
  ufile: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", (value) => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
  userimg: yup
    .mixed()
    .test("required", "사용자 이미지는 필수 입니다.", (value) => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
  files: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", (value) => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개까지만 업로드 할 수 있습니다.", (value) => {
      return value && value.length <= 3;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
  uimgfiles: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", (value) => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다.", (value) => {
      return value && value.length <= 3;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      // 파일이 여러개 이므로 각 파일을 반복문으로 용량을 비교해야 함.
      return (
        // 파일들이 있다면 && 모든 파일들을 배열로서 변환하고, every 즉, 조건이 맞는지 반복해서 비교한다.
        // every 는 모두 true인 경우만 true 를 리턴한다. 하나라도 false 면 false 리턴
        value && Array.from(value).every((file) => file.size <= 2 * 1024 * 1024)
      );
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      // 파일이 1개가 아니고 여러개이므로 반복문으로 type 비교를 해야 함.
      return (
        value &&
        Array.from(value).every((file) =>
          ["image/jpeg", "image/png"].includes(file.type)
        )
      );
    }),
  previewFile: yup
    .mixed()
    .test("required", "사용자 이미지는 필수 입니다.", (value) => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
  previewList: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", (value) => {
      return value && value.length > 0;
    })
    .test("fileCount", "최대 3개의 파일만 업로드 가능합니다.", (value) => {
      return value && value.length <= 3;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", (value) => {
      // 파일이 여러개 이므로 각 파일을 반복문으로 용량을 비교해야 함.
      return (
        // 파일들이 있다면 && 모든 파일들을 배열로서 변환하고, every 즉, 조건이 맞는지 반복해서 비교한다.
        // every 는 모두 true인 경우만 true 를 리턴한다. 하나라도 false 면 false 리턴
        value && Array.from(value).every((file) => file.size <= 2 * 1024 * 1024)
      );
    }),
});

function App() {
  // 이미지 미리보기 useState
  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);

  // 리액트 훅 폼
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { uid: "", umail: "", upw: "" },
    mode: "onChange",
  });

  useEffect(() => {
    //trigger();
  }, [trigger]);

  const handleSubmitForm = async (data) => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
    try {
      // string만 보낸다면 이대로 사용
      // const res = await axios.post("주소", data);

      // 파일은 string이 아니라 binary 입니다.
      // 그냥 보내면 안됩니다.
      // 백엔드에서 '객체 형식으로 보내주세요'라고 요청할 것..
      const sendData = new FormData();
      // 객체의 형태로 보내기 위해, input의 항목을 하나하나 객체에 담아준다
      sendData.append("uid", data.uid);
      sendData.append("umail", data.umail);
      sendData.append("upw", data.upw);
      sendData.append("ufile", data.ufile);
      sendData.append("userimg", data.userimg);
      sendData.append("files", data.userimg);
      sendData.append("uimgfiles", data.uimgfiles);
      sendData.append("previewfile", data.previewfile);
      sendData.append("previewlist", data.previewlist);

      const res = await axios.post("주소", sendData, {
        headers: {
          "Content-Type": "multipart/from-data", //파일 전송 형식
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //이미지 1장 미리보기
  const handleChangePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 웹브라우저에 임시 이미지 URL 을 생성해야 함.
      // 선택된 파일은 웹브라우저 cache 에 저장 되어 있음.
      // 이를 이용해 임시 url 을 생성함.
      // blob 을 생성해 줌.
      setPreview(URL.createObjectURL(file));
    }
  };
  //이미지 여러장 미리보기
  const handleChangePreviewList = (e) => {
    //원래 배열이기 때문에
    const files = Array.from(e.target.files);
    console.log(files);
    const List = files.map((item) => {
      return URL.createObjectURL(item);
    });
    setPreviewList([...List]);
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>아이디</label>
        <input {...register("uid")} />
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("umail")} />
        <p style={{ color: "red" }}>{errors.umail?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <p style={{ color: "red" }}>{errors.upw?.message}</p>

        <label>파일첨부</label>
        <input type="file" {...register("ufile")} />
        <p style={{ color: "red" }}>{errors.ufile?.message}</p>

        <label>사진파일첨부</label>
        <input
          type="file"
          {...register("userimg")}
          accept="image/png, image/jpeg"
        />
        <p style={{ color: "red" }}>{errors.userimg?.message}</p>
        {/* 여러 파일 추가 */}
        <label htmlFor="files">여러 파일 추가</label>
        <input
          type="file"
          name="files"
          id="files"
          {...register("files")}
          multiple
        />
        <p style={{ color: "red" }}>{errors.files?.message}</p>
        {/* 여러 이미지 추가 */}
        <label htmlFor="imgfiles">여러 이미지 추가</label>
        <input
          type="file"
          name="imgfiles"
          id="imgfiles"
          {...register("imgfiles")}
          multiple
          accept="image/png, image/jpeg"
        />
        <p style={{ color: "red" }}>{errors.imgfiles?.message}</p>
        {/* 파일 1개 이미지 미리 보기 */}
        <label>이미지 1개 미리보기</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          {...register("previewFile")}
          onChange={(e) => handleChangePreview(e)}
        />
        <p style={{ color: "red" }}>{errors.previewFile?.message}</p>
        {/* 파일 1개 이미지 미리보기  */}
        <label>이미지 1개 미리보기</label>
        <input
          type="file"
          {...register("previewfile")}
          accept="image/png, image/jpeg"
          onChange={(e) => handleChangePreview(e)}
        />
        <p style={{ color: "red" }}>{errors.previewfile?.message}</p>
        {preview && (
          <div>
            <h3>이미지 미리보기</h3>
            <img
              src={preview}
              alt="미리보기"
              style={{ width: 300, height: 300 }}
            />
          </div>
        )}
        {/* 이미지 여러장 미리보기  */}
        <label>이미지 여러장 미리보기</label>
        <input
          type="file"
          {...register("previewList")}
          accept="image/png, image/jpeg"
          multiple
          onChange={(e) => handleChangePreviewList(e)}
        />
        <p style={{ color: "red" }}>{errors.previewfileList?.message}</p>
        <div>
          <h3>이미지 미리보기</h3>
          {previewList.map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                alt="미리보기"
                style={{ width: 200, height: 200, objectFit: "cover" }}
              />
            );
          })}
        </div>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
export default App;
