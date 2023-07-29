'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from '../H_login.module.css'
import { FaUserAlt, FaKey } from "react-icons/fa";

import * as Joi from 'joi';
import { useForm } from 'react-hook-form';
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';

type lFormInterface = {
	username: string;
	password: string;
}

const valideForm = Joi.object({
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.required(),
	password: Joi.string()
		.pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
});

export default function connect() {

  const { register, handleSubmit } = useForm<lFormInterface>();
  const { push } = useRouter();

  const Send = async (form: lFormInterface) => {
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
        const rep = await axiosI.post('https://localhost/api/auth/login', {data: form});
        if (!rep.data.error)
          push('/TEST');
        else
          console.log(rep.data);
      } catch (e) {
        console.log('error');
      }
    }
  }

  return (
    <main>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.need}>
        <FaUserAlt className={style.icon}/>
        <input type='text' placeholder='Username' className={style.input} {...register("username")}></input>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.need}>
        <FaKey className={style.icon}/>
        <input type='password' placeholder='password' className={style.input} {...register("password")}></input>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
      <div className={style.validate}>
        <button className={style.validateButton} onClick={handleSubmit(Send)}>SEND</button>
      </div>
      <div style={{height: '60px', width: '100%'}}></div>
    </main>
  )
}
