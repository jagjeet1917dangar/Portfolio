import { useState, useEffect } from 'react'
import './App.css'

// Orbiting Skills Configurations
const innerSkills = [
  { 
    name: 'Git', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="currentColor">
        <path d="M23.384 11.61L12.39.616c-.78-.78-2.047-.78-2.827 0L7.33 3.847l3.834 3.834c.73-.24 1.58-.08 2.17.51.59.59.75 1.44.51 2.17l3.834 3.834c.73-.24 1.58-.08 2.17.51.78.78.78 2.047 0 2.828-.78.78-2.047.78-2.828 0-.59-.59-.75-1.44-.51-2.17L12.69 11.7c-.24.73-.08 1.58.51 2.17.59.59 1.44.75 2.17.51l3.834 3.834c.78.78.78 2.047 0 2.827-.78.78-2.047.78-2.827 0l-10.995-11-2.23 2.23c-.78.78-.78 2.047 0 2.827l10.99 11.003c.78.78 2.047.78 2.828 0l10.99-10.99c.78-.78.78-2.047 0-2.827z"/>
      </svg>
    )
  },
  { 
    name: 'GitHub', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    )
  },
  { 
    name: 'Node.js', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  { 
    name: 'C', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18 7a7 7 0 1 0 0 10" />
      </svg>
    )
  },
  { 
    name: 'C++', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M13 7a7 7 0 1 0 0 10" />
        <path d="M18 12h4M20 10v4" />
      </svg>
    )
  }
]

const outerSkills = [
  { 
    name: 'HTML5', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="currentColor">
        <path d="M1.5 22L0 0h24l-1.5 22L12 24zM20.25 4.5H3.75l1 14.5 7.25 2 7.25-2zm-3 8.25h-5.5v1.75h3.75l-.25 3.25-3.25.75-3.25-.75-.25-2.25h-2l.25 4 5.25 1.5 5.25-1.5.75-6.75zm.5-4H6.5l.25 2.25H18z" />
      </svg>
    )
  },
  { 
    name: 'CSS3', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="currentColor">
        <path d="M1.5 22L0 0h24l-1.5 22L12 24zM20.25 4.5H3.75l1 14.5 7.25 2 7.25-2zm-8.25 11.5l3.25-.75.25-3H6.75l-.25-2.25h9.5l.25-3.25H7.25l-.25-2.25h12.5l-.75 9-6.75 1.5z" />
      </svg>
    )
  },
  { 
    name: 'JavaScript', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px' }} fill="currentColor">
        <path d="M0 0h24v24H0V0zm19.8 15.6c-.6-1-1.6-1.5-3-1.5-1.6 0-2.5.8-2.5 1.9 0 1.2.7 1.7 2.3 2.3 2.1.8 3.5 1.5 3.5 3.7 0 2.4-1.9 4.1-5.1 4.1-3.2 0-5-1.6-5.8-3.4l2.6-1.6c.6 1 1.4 1.7 3.2 1.7 1.8 0 2.6-.7 2.6-1.7 0-1.1-.6-1.5-2.1-2.1-2.2-.9-3.7-1.6-3.7-3.9 0-2.2 1.7-3.8 4.7-3.8 2.6 0 4.3 1.2 5 2.8l-2.5 1.5zm-8.5.2v8.2h-3v-8.2h3z" />
      </svg>
    )
  },
  { 
    name: 'React', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  { 
    name: 'Next.js', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="currentColor">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.275 18l-5.69-7.464v7.464h-1.685v-10h1.685l5.69 7.464v-7.464h1.685v10h-1.685z" />
      </svg>
    )
  },
  { 
    name: 'MongoDB', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.5 2 6.5 7.5 6.5 10c0 4.5 5.5 8.5 5.5 12 0-3.5 5.5-7.5 5.5-12 0-2.5 0-8-5.5-8z" />
        <path d="M12 2v20" />
      </svg>
    )
  },
  { 
    name: 'MySQL', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    )
  },
  { 
    name: 'PostgreSQL', 
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v8c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
        <path d="M4 11c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        <path d="M12 14v6" />
        <circle cx="12" cy="20" r="2" />
      </svg>
    )
  }
]

const skillsCategories = [
  {
    title: 'Frontend',
    underlineClass: 'frontend-accent',
    skills: [
      {
        name: 'HTML5',
        icon: (
          <svg viewBox="0 0 512 512" style={{ width: '30px', height: '30px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#E34F26" d="M71,460 L30,0 L481,0 L440,460 L255,512 Z" />
            <path fill="#EF652A" d="M256,472 L407,430 L440,43 L256,43 Z" />
            <path fill="#EBEBEB" d="M256,176 L256,110 L121,110 L128,176 L256,176 Z M256,290 L256,224 L189,224 L183,158 L117,158 L129,290 L256,290 Z M256,380 L256,312 L193,295 L189,252 L123,252 L136,396 L256,429 Z" />
            <path fill="#FFFFFF" d="M256,110 L256,176 L335,176 L328,252 L256,252 L256,318 L320,301 L314,367 L256,383 L256,450 L376,417 L390,256 L397,176 L402,110 Z" />
          </svg>
        )
      },
      {
        name: 'CSS3',
        icon: (
          <svg viewBox="0 0 512 512" style={{ width: '30px', height: '30px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#264DE4" d="M71,460 L30,0 L481,0 L440,460 L255,512 Z" />
            <path fill="#2965F1" d="M256,472 L407,430 L440,43 L256,43 Z" />
            <path fill="#EBEBEB" d="M256,224 L135,224 L138,256 L256,256 Z M256,110 L121,110 L128,176 L256,176 Z M256,380 L256,312 L193,295 L189,252 L123,252 L136,396 L256,429 Z" />
            <path fill="#FFFFFF" d="M256,110 L256,176 L390,176 L384,242 L256,242 L256,308 L320,291 L314,357 L256,373 L256,440 L376,407 L389,246 L397,110 Z" />
          </svg>
        )
      },
      {
        name: 'JavaScript',
        icon: (
          <svg viewBox="0 0 512 512" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <rect fill="#F7DF1E" width="512" height="512" rx="64"/>
            <path fill="#000000" d="M309.2,393.3 C316.5,407.5 329,417.8 348.8,417.8 C369.3,417.8 382,408.8 382,386.3 C382,367 369.8,358.5 344,347.3 C312.8,333.8 290.8,321 290.8,285 C290.8,252.8 315.8,230.3 349.5,230.3 C378,230.3 399.8,243.5 410.8,266.3 L377,286.3 C370,274.5 361.3,269.8 349.5,269.8 C337,269.8 329.8,276.5 329.8,286 C329.8,296.8 337.8,302.3 358.3,311.3 C393,326.3 421.3,338.8 421.3,382 C421.3,418.5 393.5,441.8 350.3,441.8 C308,441.8 284,417.3 273.8,393.3 L309.2,393.3 Z M233.8,382.3 C233.8,405 218.8,417.8 198.8,417.8 C181,417.8 170.8,409.8 165.8,397.3 L132.8,417.3 C142.8,435.5 163.5,441.8 198.8,441.8 C252.3,441.8 272.8,411 272.8,367.8 L272.8,233.8 L233.8,233.8 L233.8,382.3 Z" />
          </svg>
        )
      },
      {
        name: 'React.js',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px' }} fill="none" stroke="#61DAFB" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
            <circle cx="12" cy="12" r="2" fill="#61DAFB" />
          </svg>
        )
      },
      {
        name: 'Next.js',
        icon: (
          <svg viewBox="0 0 128 128" style={{ width: '30px', height: '30px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="64" cy="64" r="64" fill="#000000" />
            <path d="M101.2 101.4L49 35.2H41v57.6h7.6V46.6l45.4 57.6h7.2zM98.6 35.2h-7.6v29.4l7.6 9.6V35.2z" fill="#FFFFFF"/>
          </svg>
        )
      },
      {
        name: 'Tailwind CSS',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .25 1.7 1 2.5 1.8C14 11 15.3 12.3 18 12.3c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.22-1.54-.87-2.3-1.62-.96-.96-2.27-2.28-5.5-2.28zM6.001 12.3c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .25 1.7 1 2.5 1.8 1.3 1.4 2.6 2.7 5.3 2.7 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.22-1.54-.87-2.3-1.62-.96-.96-2.27-2.28-5.5-2.28z" fill="#06B6D4" />
          </svg>
        )
      },
      {
        name: 'TypeScript',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <rect fill="#3178C6" width="24" height="24" rx="3"/>
            <path fill="#FFFFFF" d="M18.8 13.5h-1.6v6.2h-1.6v-6.2h-1.6V12h4.8v1.5z M10.4 17.5c.2.6.7.9 1.5.9.8 0 1.2-.4 1.2-.9s-.3-.7-.9-1l-1.1-.5c-1-.5-1.5-1-1.5-2.2 0-1.4 1.1-2.4 2.6-2.4 1.5 0 2.4.9 2.5 2.2h-1.6c-.1-.6-.5-.9-1-.9-.5 0-.8.3-.8.7s.3.5.7.7l1.1.5c1.2.6 1.7 1.1 1.7 2.4 0 1.5-1.1 2.5-2.8 2.5-1.7 0-2.7-1-2.9-2.5h1.5z" />
          </svg>
        )
      },
      {
        name: 'Material UI',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#0081CB" d="M12 2L2 7.73v10.54L12 24l10-5.73V7.73L12 2zm8 15l-8 4.6-8-4.6V9.07l8-4.6 8 4.6V17z" />
            <path fill="#00B0FF" d="M12 6.07L6 9.53v6.94l6 3.46 6-3.46V9.53l-6-3.46z" />
          </svg>
        )
      }
    ]
  },
  {
    title: 'Backend',
    underlineClass: 'backend-accent',
    skills: [
      {
        name: 'Node.js',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#339933" d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6 14.3l-6 3.5-6-3.5V9.7l6-3.5 6 3.5v6.6z" />
            <path fill="#339933" d="M12 6.2l4.5 2.6v5.2L12 16.6l-4.5-2.6V8.8L12 6.2z" opacity="0.6"/>
          </svg>
        )
      },
      {
        name: 'MongoDB',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#47A248" d="M12 2C8.5 2 7 6 7 11.5c0 4.8 3.5 8.7 5 10.5 1.5-1.8 5-5.7 5-10.5C17 6 15.5 2 12 2zm0 18.2c-.4-.7-2.8-4.8-2.8-8.7 0-4.3 1.2-6.9 2.8-7.9v16.6z" />
            <path fill="#3F3F3F" d="M12 2.1v16.5c1.6-1 2.8-3.6 2.8-7.9 0-3.9-2.4-8-2.8-8.6z" />
          </svg>
        )
      },
      {
        name: 'Express.js',
        icon: (
          <svg viewBox="0 0 48 24" style={{ width: '48px', height: '24px' }} fill="#828282" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="4" width="48" height="16" rx="4" fill="#FFF" opacity="0.1" />
            <text x="24" y="13.5" dominantBaseline="middle" textAnchor="middle" fill="#FFF" fontSize="6.5" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.2">EXPRESS</text>
          </svg>
        )
      },
      {
        name: 'MySQL',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#00758F" d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 6c-3.86 0-7-1.34-7-3s3.14-3 7-3 7 1.34 7 3-3.14 3-7 3z" />
            <path fill="#F29111" d="M2 9.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2c0 2.48-4.48 4.5-10 4.5S2 10 2 7.5v2z" />
            <path fill="#00758F" d="M2 14.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2c0 2.48-4.48 4.5-10 4.5S2 15 2 12.5v2z" />
          </svg>
        )
      },
      {
        name: 'Redux Toolkit',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} fill="#764ABC" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.48 11.23a3.52 3.52 0 0 0-4.14-2.61l-1 .2a1 1 0 0 0-.78 1.18 1 1 0 0 0 1.18.78l1-.2a1.52 1.52 0 0 1 1.78 1.12c.31.95-.23 1.94-1.2 2.22l-4.7 1.34a1.52 1.52 0 0 1-1.79-1.12A1.51 1.51 0 0 1 9 12.36l1-.2a1 1 0 1 0-.4-1.96l-1 .2a3.52 3.52 0 0 0-2.6 4.14 3.5 3.5 0 0 0 4.13 2.61l4.7-1.34a3.52 3.52 0 0 0 2.65-4.58z" fill="#764ABC" />
            <path d="M9.89 8.27a3.51 3.51 0 0 0 2.66-4.58 3.52 3.52 0 0 0-4.57-2.66l-4.7 1.34a3.52 3.52 0 0 0-2.66 4.58 3.52 3.52 0 0 0 4.58 2.65l1-.2a1 1 0 0 0-.78-1.18 1 1 0 0 0-1.18.78l-1 .2a1.52 1.52 0 0 1-1.98-1.15 1.52 1.52 0 0 1 1.15-1.98l4.7-1.34A1.52 1.52 0 0 1 9 5.89a1.5 1.5 0 0 1 .86 1.83l.87.55z" fill="#764ABC" opacity="0.8" />
            <path d="M22.06 6.35a3.51 3.51 0 0 0-4.57-2.66l-1 .2a1 1 0 0 0 .4 1.96l1-.2a1.52 1.52 0 0 1 1.98 1.15 1.52 1.52 0 0 1-1.15 1.98l-4.7 1.34a1.51 1.51 0 0 1-1.99-1.15 1.5 1.5 0 0 1 .86-1.83l-1-.2A3.52 3.52 0 0 0 8.28 11.5a3.5 3.5 0 0 0 2.65 4.57l4.7-1.34a3.51 3.51 0 0 0 2.66-4.58l3.77-3.8z" fill="#764ABC" opacity="0.6" />
          </svg>
        )
      },
      {
        name: 'Docker',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '30px', height: '30px' }} fill="#2496ED" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.983 8.871h-1.996V10.87h1.996V8.871zM13.983 6.323h-1.996V8.32h1.996V6.323zM11.435 8.871H9.438V10.87h1.997V8.871zM11.435 6.323H9.438V8.32h1.997V6.323zM8.887 8.871H6.89V10.87h1.997V8.871zM8.887 6.323H6.89V8.32h1.997V6.323zM6.339 8.871H4.343V10.87h1.996V8.871zM6.339 11.366H4.343v1.996h1.996v-1.996zM13.983 11.366h-1.996v1.996h1.996v-1.996zM16.53 8.871h-1.996V10.87h1.996V8.871zM16.53 11.366h-1.996v1.996h1.996v-1.996zM23.99 12.637c-.305-.187-.665-.285-1.026-.285a2.533 2.533 0 0 0-.962.19v-.607c0-.28-.051-.555-.152-.816a2.505 2.505 0 0 0-1.874-1.636 2.528 2.528 0 0 0-1.503.267v-3.43c0-.276-.224-.5-.5-.5h-1.996v1.996h1.496v4.717a2.536 2.536 0 0 0-.923 1.954c0 .41.096.812.28 1.173a2.526 2.526 0 0 0 2.222 1.393h5.438c.677 0 1.25-.461 1.417-1.12a1.523 1.523 0 0 0-.447-1.306zM16.53 13.863H.443a.5.5 0 0 0-.5.5c0 4.143 3.357 7.5 7.5 7.5a7.487 7.487 0 0 0 6.643-4.045c.983-.024 1.9-.387 2.645-.989l.192.193a.5.5 0 0 0 .707 0l2-2a.5.5 0 0 0 0-.707l-.192-.193c.27-.478.44-1.022.483-1.603.203.218.489.344.789.344.524 0 .973-.342 1.12-.843a1.134 1.134 0 0 0-.332-.971z" />
          </svg>
        )
      }
    ]
  },
  {
    title: 'Design & Tools',
    underlineClass: 'tools-accent',
    skills: [
      {
        name: 'Figma',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#F24E1E" d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4h4V2h-4z" />
            <path fill="#A259FF" d="M8 10a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-4H12a4 4 0 0 0-4 4z" />
            <path fill="#1ABC9C" d="M8 14a4 4 0 0 0 4 4 4 4 0 0 0 4-4H12a4 4 0 0 0-4 4z" />
            <path fill="#0ACF83" d="M8 22a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8z" />
            <path fill="#18A0FB" d="M16 14a4 4 0 0 0 4-4 4 4 0 0 0-4-4v8z" />
          </svg>
        )
      },
      {
        name: 'Git',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} fill="#F05032" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.384 11.61L12.39.616c-.78-.78-2.047-.78-2.827 0L7.33 3.847l3.834 3.834c.73-.24 1.58-.08 2.17.51.59.59.75 1.44.51 2.17l3.834 3.834c.73-.24 1.58-.08 2.17.51.78.78.78 2.047 0 2.828-.78.78-2.047.78-2.828 0-.59-.59-.75-1.44-.51-2.17L12.69 11.7c-.24.73-.08 1.58.51 2.17.59.59 1.44.75 2.17.51l3.834 3.834c.78.78.78 2.047 0 2.827-.78.78-2.047.78-2.827 0l-10.995-11-2.23 2.23c-.78.78-.78 2.047 0 2.827l10.99 11.003c.78.78 2.047.78 2.828 0l10.99-10.99c.78-.78.78-2.047 0-2.827z"/>
          </svg>
        )
      },
      {
        name: 'Github',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        )
      },
      {
        name: 'Postman',
        icon: (
          <svg viewBox="0 0 512 512" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <circle cx="256" cy="256" r="256" fill="#FF6C37" />
            <path fill="#FFF" d="M375.4 191c-10.7-37.3-36.5-68-73.4-84.5-27.4-12.3-57.8-16.1-88-10.7l-75.1-75.1c-13.4-13.4-34.9-13.4-48.3 0L38.5 72.8c-13.4 13.4-13.4 34.9 0 48.3l75.1 75.1c-5.4 30.2-1.6 60.6 10.7 88 16.5 36.9 47.2 62.7 84.5 73.4l166.6-166.6zM461.5 461.5c13.4-13.4 13.4-34.9 0-48.3l-75.1-75.1c5.4-30.2 1.6-60.6-10.7-88-16.5-36.9-47.2-62.7-84.5-73.4L124.6 343.3c10.7 37.3 36.5 68 73.4 84.5 27.4 12.3 57.8 16.1 88 10.7l75.1 75.1c13.4 13.4 34.9 13.4 48.3 0l52.1-52.1z" />
          </svg>
        )
      },
      {
        name: 'Vercel',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 22.525H0L12 1.475L24 22.525Z" />
          </svg>
        )
      },
      {
        name: 'Firebase',
        icon: (
          <svg viewBox="0 0 116 160" style={{ width: '24px', height: '30px' }} xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFCA28" d="M24.4 127L1.1 82.2c-.9-1.8-.1-4 1.8-4.7.7-.3 1.5-.3 2.1 0l67.2 28.5L24.4 127z" />
            <path fill="#F57C00" d="M89.3 54.3L70.6 18.6c-.9-1.8-3.1-2.5-4.9-1.6-.5.3-.9.7-1.1 1.2L42.5 59.8l46.8-5.5z" />
            <path fill="#FFA000" d="M42.5 59.8L2.4 136.2c-.8 1.5-.2 3.3 1.3 4.1.5.3 1.1.4 1.7.2l104.7-58.7L42.5 59.8z" />
          </svg>
        )
      },
      {
        name: 'Render',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '32px', height: '32px' }} xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="rgba(70, 107, 225, 0.1)" />
            <path d="M6 18V6h5c2.5 0 4 1.5 4 3.5s-1.5 3-3.5 3h-1.5v5.5H6zm4-7.5c1.5 0 2.5-.5 2.5-1.5s-1-1.5-2.5-1.5H8.5v3H10zm3.5 4.5l3.5 3h3l-4-3.5h-2.5z" fill="#466BE1" />
          </svg>
        )
      }
    ]
  },
  {
    title: 'Programming Languages',
    underlineClass: 'languages-accent',
    skills: [
      {
        name: 'Javascript',
        icon: (
          <svg viewBox="0 0 512 512" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <rect fill="#F7DF1E" width="512" height="512" rx="64"/>
            <path fill="#000000" d="M309.2,393.3 C316.5,407.5 329,417.8 348.8,417.8 C369.3,417.8 382,408.8 382,386.3 C382,367 369.8,358.5 344,347.3 C312.8,333.8 290.8,321 290.8,285 C290.8,252.8 315.8,230.3 349.5,230.3 C378,230.3 399.8,243.5 410.8,266.3 L377,286.3 C370,274.5 361.3,269.8 349.5,269.8 C337,269.8 329.8,276.5 329.8,286 C329.8,296.8 337.8,302.3 358.3,311.3 C393,326.3 421.3,338.8 421.3,382 C421.3,418.5 393.5,441.8 350.3,441.8 C308,441.8 284,417.3 273.8,393.3 L309.2,393.3 Z M233.8,382.3 C233.8,405 218.8,417.8 198.8,417.8 C181,417.8 170.8,409.8 165.8,397.3 L132.8,417.3 C142.8,435.5 163.5,441.8 198.8,441.8 C252.3,441.8 272.8,411 272.8,367.8 L272.8,233.8 L233.8,233.8 L233.8,382.3 Z" />
          </svg>
        )
      },
      {
        name: 'C Language',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#A8B9CC" />
            <path d="M16 8.5C15 7.5 13.5 7 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.5 0 3-.5 4-1.5l1.5 1.5C16 18.5 14 19 12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7c2 0 4 .5 5.5 2L16 8.5z" fill="#FFFFFF" />
          </svg>
        )
      },
      {
        name: 'CPP',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#00599C" />
            <path d="M13 8.5C12 7.5 10.5 7 9 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.5 0 3-.5 4-1.5l1.5 1.5C13 18.5 11 19 9 19c-3.87 0-7-3.13-7-7s3.13-7 7-7c2 0 4 .5 5.5 2L13 8.5z" fill="#FFFFFF" />
            <path d="M16 11h2v2h-2v-2zM15 12h4v-1h-4v1zM20 11h2v2h-2v-2zM19 12h4v-1h-4v1z" fill="#FFFFFF" />
          </svg>
        )
      },
      {
        name: 'Java',
        icon: (
          <svg viewBox="0 0 24 24" style={{ width: '28px', height: '28px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 9.5H16v-2h3.5a1.5 1.5 0 0 1 0 3z" stroke="#ea2d2e" strokeWidth="2" />
            <path d="M5 8v6a5 5 0 0 0 5 5h3a5 5 0 0 0 5-5V8H5z" fill="#5382a1" />
            <path d="M8 2c0 2-2 3-2 5M12 2c0 2-2 3-2 5M16 2c0 2-2 3-2 5" stroke="#ea2d2e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      }
    ]
  }
]

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [fadeExit, setFadeExit] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Handle intro completion with a smooth fade-out
  const handleIntroEnd = () => {
    setFadeExit(true)
    setTimeout(() => {
      setShowIntro(false)
    }, 800) // Matches the 0.8s CSS transition duration
  }

  // Prevent scroll while intro is playing, restore on exit
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  // Safety timer to auto-transition in case of loading lag or video format blocks
  useEffect(() => {
    const timer = setTimeout(() => {
      handleIntroEnd()
    }, 5500) // Snappy 5.5 seconds safety window

    return () => clearTimeout(timer)
  }, [])

  // Handle simple elegant contact form action
  const handleContactSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      e.target.reset()
    }, 3000)
  }

  return (
    <>
      {/* 🎬 5-Second Video Preloader Splash Screen */}
      {showIntro && (
        <div className={`video-preloader ${fadeExit ? 'fade-out' : ''}`}>
          <video
            src="/jagjeet-name-loader.mp4"
            autoPlay
            muted
            playsInline
            onPlay={(e) => {
              e.currentTarget.playbackRate = 1.6 // Plays the 8s video in exactly 5s
            }}
            onEnded={handleIntroEnd}
            className="preloader-video"
          />
          <div className="preloader-overlay"></div>
          <div className="preloader-progress-bar">
            <div className="progress-fill" style={{ animationDuration: '5s' }}></div>
          </div>
          <button type="button" className="skip-btn" onClick={handleIntroEnd}>
            Skip Intro
          </button>
        </div>
      )}

      {/* 🚀 Main Site Content (Unlocks after preloader ends) */}
      <div style={{ opacity: showIntro && !fadeExit ? 0 : 1, transition: 'opacity 1s ease' }}>
        
        {/* Sticky Luxury Navbar */}
        <header className="navbar">
          <a href="#home" className="logo-text">
            <span>J</span>agjeet <span>D</span>angar
          </a>
          <nav>
            <ul className="nav-links">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#skills" className="nav-link">Skills</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
        </header>

        {/* 1. Hero Bento Section */}
        <main id="home" className="hero-bento">
          
          {/* Left Intro Card */}
          <section className="intro-card">
            <div className="welcome-pill">
              <span className="welcome-pill-dot"></span>
              Welcome to my Portfolio
            </div>
            
            <h1 className="hero-title">
              Hi, I'm a <br />
              <span>Web Developer</span>
            </h1>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Transforming complex ideas into responsive digital realities</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Creating elegant, minimalistic and creative dark interfaces</span>
              </div>
              <div className="feature-item">
                <span className="feature-dot"></span>
                <span>Building robust, scalable and secure full-stack solutions</span>
              </div>
            </div>

            <div className="cta-group">
              <a href="#projects" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                </svg>
                View Work
              </a>
              <a href="#contact" className="btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Let's Talk
              </a>
              <a href="/resume.pdf" target="_blank" className="btn-glass">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Resume
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn-glass">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
                View Project Video
              </a>
            </div>
          </section>

          {/* Right Avatar Card with Orbiting Technology Badges */}
          <section className="avatar-card">
            <div className="orbit-container">
              
              {/* Outer Orbit (Spins clockwise, carrying 8 badges) */}
              <div className="outer-orbit">
                {outerSkills.map((skill, idx) => {
                  const angle = (idx * 360) / outerSkills.length
                  const radius = 230
                  const badgeSize = 58
                  const x = radius + radius * Math.cos((angle * Math.PI) / 180) - badgeSize / 2
                  const y = radius + radius * Math.sin((angle * Math.PI) / 180) - badgeSize / 2
                  return (
                    <div
                      key={skill.name}
                      className="tech-badge"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${badgeSize}px`,
                        height: `${badgeSize}px`,
                        position: 'absolute'
                      }}
                    >
                      {skill.icon}
                      <span className="tech-badge-tooltip">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
              
              {/* Inner Orbit (Spins counter-clockwise, carrying 5 badges) */}
              <div className="inner-orbit">
                {innerSkills.map((skill, idx) => {
                  const angle = (idx * 360) / innerSkills.length
                  const radius = 180
                  const badgeSize = 48
                  const x = radius + radius * Math.cos((angle * Math.PI) / 180) - badgeSize / 2
                  const y = radius + radius * Math.sin((angle * Math.PI) / 180) - badgeSize / 2
                  return (
                    <div
                      key={skill.name}
                      className="tech-badge"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${badgeSize}px`,
                        height: `${badgeSize}px`,
                        position: 'absolute'
                      }}
                    >
                      {skill.icon}
                      <span className="tech-badge-tooltip">{skill.name}</span>
                    </div>
                  )
                })}
              </div>
              
              {/* Circular Avatar Wrapper (Your colossal black-and-white photo) */}
              <div className="avatar-wrapper">
                <img 
                  src="/jagjeet.png" 
                  alt="Jagjeet Dangar Black and White Portrait" 
                  className="avatar-image"
                />
              </div>

            </div>
          </section>

        </main>

        {/* 2. Skills Bento Section */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <p className="section-subtitle">Excellence</p>
            <h2 className="section-title">My Skillset</h2>
          </div>
          
          <div className="skills-container-grid">
            {skillsCategories.map((category) => (
              <div key={category.title} className="skills-category-column">
                <div className="skills-category-header-wrap">
                  <h3 className="skills-category-header">{category.title}</h3>
                  <div className={`skills-category-underline ${category.underlineClass}`}></div>
                </div>
                
                <div className="skills-cards-wrapper">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skill-card">
                      <div className="skill-card-icon">
                        {skill.icon}
                      </div>
                      <span className="skill-card-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Projects Bento Section */}
        <section id="projects" className="projects-section">
          <div className="section-header">
            <p className="section-subtitle">Showcase</p>
            <h2 className="section-title">Creative Projects</h2>
          </div>
          
          <div className="projects-grid">
            
            {/* Project 1 */}
            <article className="project-card">
              <div className="project-preview">
                <div className="project-preview-content">
                  <span className="project-preview-icon">🛒</span>
                  <code>&lt;DigitalMarketplace /&gt;</code>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <div className="project-tags">
                    <span className="project-tag">Full Stack</span>
                    <span className="project-tag">React</span>
                    <span className="project-tag">Stripe</span>
                  </div>
                  <h3 className="project-card-title">E-Commerce Experience</h3>
                  <p className="project-card-desc">
                    A premium digital marketplace application with sleek dark modes, instant checkout integrations, order history management, and secure admin hubs.
                  </p>
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-link">
                  Explore Repository <span>➜</span>
                </a>
              </div>
            </article>

            {/* Project 2 */}
            <article className="project-card">
              <div className="project-preview">
                <div className="project-preview-content">
                  <span className="project-preview-icon">⭐</span>
                  <code>&lt;CinematicEngine /&gt;</code>
                </div>
              </div>
              <div className="project-info">
                <div>
                  <div className="project-tags">
                    <span className="project-tag">Frontend</span>
                    <span className="project-tag">CSS3 Orbits</span>
                    <span className="project-tag">Bento Grid</span>
                  </div>
                  <h3 className="project-card-title">Creative Portfolio Engine</h3>
                  <p className="project-card-desc">
                    An ultra-premium personal showcase engine utilizing accelerated video overlays, orbital rotation metrics, frosted glassmorphism elements, and fully tailored responsive rules.
                  </p>
                </div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-link">
                  Explore Repository <span>➜</span>
                </a>
              </div>
            </article>

          </div>
        </section>

        {/* 4. Contact Bento Section */}
        <section id="contact" className="contact-container">
          <div className="section-header">
            <p className="section-subtitle">Connect</p>
            <h2 className="section-title">Start a Conversation</h2>
          </div>

          <div className="contact-card">
            <div className="contact-intro">
              <h3 className="contact-intro-title">Let's build something exceptional</h3>
              <p className="contact-intro-desc">Have an idea, project, or just want to connect? Send a message and let's coordinate.</p>
            </div>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--gold-accent)' }}>✓</div>
                <h4 style={{ color: '#ffffff', margin: '0 0 8px', fontSize: '18px' }}>Message Sent Successfully!</h4>
                <p style={{ color: 'var(--text-silver)', margin: 0 }}>Thank you for reaching out, Jagjeet will respond shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" id="name" required placeholder="Jagjeet Dangar" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" id="email" required placeholder="jagjeet@example.com" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea id="message" required placeholder="Tell me about your project..." className="form-textarea"></textarea>
                </div>
                <button type="submit" className="btn-primary submit-btn">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Elegant Footer */}
        <footer className="footer">
          <p>© 2026 <span>Jagjeet Dangar</span>. Crafted with absolute creative passion.</p>
        </footer>

      </div>
    </>
  )
}

export default App
