import React from 'react'
import { useForm } from 'react-hook-form'
import './Contacts.scss'

type Props = {}

type FormData = {
  email: string,
  subject: string,
  message: string,
}

const Contacts: React.FC<Props> = (props) => {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => console.log(data));
  return (
    <div className="Contacts" id="Contacts">
      <div className="text">
        <h3>Свяжитесь с нами</h3>
        <p>
          Если у вас есть вопросы, пожелания или предложения, напишите нам. <br/>
          или задайте вопрос в нашем <br />
          <a href="https://t.me/spot_chat" target="_blank" rel="noreferrer noopener">телеграм-канале</a>
        </p>
      </div>
      <form className="message-form" onSubmit={onSubmit}>
        <label>
          <p>Email для обратной связи
            {errors.email && (
              <span className="error">&nbsp;необходимо заполнить</span>
            )}
          </p>
          <input {...register("email",{ required: true })} />
        </label>
        <label>
          <p>Тема письма</p>
          <input {...register("subject")} />
        </label>
        <label>
          <p>Текст сообщения
            {errors.message && (
            <span className="error">&nbsp; отсутствует, не стесняйтесь</span>
          )}</p>
          <textarea {...register("message",{ required: true })} />
        </label>




        <input className="send" type="submit" value="Отправить" />
      </form>
    </div>
  )
}

export default React.memo(Contacts)
