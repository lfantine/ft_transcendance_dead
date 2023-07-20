'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from '../H_login.module.css'
import { FaUserAlt, FaKey } from "react-icons/fa";

import * as Joi from 'joi';
import { useForm } from 'react-hook-form';

type lFormInterface = {
	username: string;
	password: string;
}

const Send = (form: lFormInterface) => {
  console.log(form);
}

export default function connect() {

  const { register, handleSubmit } = useForm<lFormInterface>();

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
