import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import '../app.css';
/*const formSemasi = Yup.object().shape({
  title: Yup.string()
    .required('Task başlığı yazmalısınız')
    .min(3, 'Task başlığı en az 3 karakter olmalı'),
  description: Yup.string()
    .required('Task açıklaması yazmalısınız')
    .min(10, 'Task açıklaması en az 10 karakter olmalı'),
  people: Yup.array()
    .max(3, 'En fazla 3 kişi seçebilirsiniz')
    .min(1, 'Lütfen en az bir kişi seçin'),
});*/

const initialFormData = {
  title: '',
  description: '',
  people: [],
};

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ defaultValues: initialFormData, mode: 'all' });

  function handleSubmitT(data, e) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: 'yapılacak',
    });
    toast.success('Yeni görev oluşturuldu.');
    e.target.reset;
  }

  const validatePeople = (value) => {
    if (value.length > 3) {
      return 'En fazla 3 kişi seçebilirsiniz';
    }
    if (value.length == 0) {
      return 'Lütfen en az bir kişi seçin';
    }
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(handleSubmitT)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          type="text"
          id="title"
          {...register('title', {
            required: 'Task başlığı yazmalısınız',
            minLength: {
              value: 3,
              message: 'Task başlığı en az 3 karakter olmalı',
            },
          })}
        />
        <p className="input-error">{errors.title?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          id="description"
          rows="3"
          {...register('description', {
            required: 'Task açıklaması yazmalısınız',
            minLength: {
              value: 10,
              message: 'Task açıklaması en az 10 karakter olmalı',
            },
          })}
        ></textarea>
        <p className="input-error">{errors.description?.message}</p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                id="people"
                value={p}
                {...register('people', {
                  validate: validatePeople,
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
