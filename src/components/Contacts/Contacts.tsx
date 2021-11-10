import React from 'react'
import { useForm } from 'react-hook-form'
import './Contacts.scss'

type Props = {}

type FormData = {
  email: string,
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
          или задайте вопрос в нашем
          <a href="https://t.me/spot_chat" target="_blank" rel="noreferrer noopener">телеграм-канале</a>
        </p>
      </div>
      <form className="message-form" onSubmit={onSubmit}>
        {errors.email && (
          <div className="error">Будьте добры, укажите ваш Email</div>
        )}
        <input {...register("email",{ required: true })} placeholder="Email" />

        {errors.message && (
          <div className="error">Не надо стесняться, пишите</div>
        )}
        <textarea {...register("message",{ required: true })} placeholder="Сообщение" />

        <input className="send" type="submit" value="Отправить" />
      </form>
    </div>
  )
}

export default React.memo(Contacts)
