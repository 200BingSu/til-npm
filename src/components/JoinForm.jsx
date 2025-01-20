import { Button, Form, Input, Radio } from "antd";
import { useState } from "react";

const JoinForm = ({ theme }) => {
  // theme을 props로 받음
  console.log(theme); // theme이 정상적으로 출력됨

  const [value, setValue] = useState(1);

  const initialValues = {
    userid: "",
    userpass: "hello",
    nickname: "길동",
    email: "a@a.net",
  };

  const onChangeField = _field => {
    console.log(_field[0].value);
  };

  const onFinished = values => {
    console.log(values);
  };

  const onChange = e => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
        onFieldsChange={(changeFields, allFields) =>
          onChangeField(changeFields)
        }
        onFinish={values => onFinished(values)}
      >
        {/* Form Items */}
        <Form.Item
          name={"userid"}
          label="아이디"
          required={true}
          rules={[
            { required: true, message: "아이디는 필수사항입니다." },
            { min: 4, message: "아이디는 4자 이상입니다." },
            { max: 8, message: "아이디는 8자 이하입니다." },
          ]}
        >
          <Input placeholder="아이디를 입력하세요" />
        </Form.Item>
        <Form.Item
          name={"userpass"}
          label="비밀번호"
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수사항입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요" />
        </Form.Item>
        {/* Buttons */}
        <Button
          style={{
            backgroundColor: theme.token.colorSecondary1,
            color: "#fff",
          }}
        >
          Secondary 1
        </Button>
        <Button
          style={{
            backgroundColor: theme.token.colorSecondary2,
            color: "#fff",
          }}
        >
          Secondary 2
        </Button>
        <Button
          style={{
            backgroundColor: theme.token.colorSecondary3,
            color: "#fff",
          }}
        >
          Secondary 3
        </Button>
      </Form>
    </div>
  );
};

export default JoinForm;
