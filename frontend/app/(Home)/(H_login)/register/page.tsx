'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from '../H_login.module.css'
import * as Joi from 'joi';

import { FaUserAlt, FaKey } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { send } from 'process';
import axios, { AxiosInstance } from 'axios';
import { ApiResponse } from '@/utils/api_response';
import { useRouter } from 'next/navigation';

type rFormInterface = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const valideForm = Joi.object({
	email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } }),
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
	confirmPassword: Joi.ref('password'),
});

const Send = async (form: rFormInterface) => {
  const validform = valideForm.validate(form);
  if (validform.error) {
    console.log(validform.error.details);
  }
  else
  {
    const axiosI: AxiosInstance = axios.create({
      baseURL: '',
    });
    try {
      const rep = await axiosI.post('https://localhost/api/auth/register', {data: form});
      if (rep.data.error){
        console.log('error');
      }
      else {
        console.log(rep.data.data);
        const { push } = useRouter();
        push('/login');
      }
    } catch (e) {
      console.log('error');
    }
  }
}

export default function connect() {

  const [conf, setConf] = useState('confirm password');
  const { register, handleSubmit } = useForm<rFormInterface>();

  return (
    <main>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.need}>
        <FaUserAlt className={style.icon}/>
        <input type='text' placeholder='Username' className={style.input} {...register("username")}></input>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.need}>
        <AiTwotoneMail className={style.icon}/>
        <input type='mail' placeholder='email' className={style.input} {...register("email")}></input>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.need}>
        <FaKey className={style.icon}/>
        <input type='password' placeholder='password' className={style.input} {...register("password")}></input>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.need}>
        <FaKey className={style.icon}/>
        <input type='password' placeholder={conf} className={style.input} {...register("confirmPassword")}></input>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.validate}>
        <button className={style.validateButton} onClick={handleSubmit(Send)}>SEND</button>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
    </main>
  )
}
