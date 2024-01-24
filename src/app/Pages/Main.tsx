'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import './Main.css'
import Footer from './Footer'
import { IMG } from 'assets/images'

export default function Main() {
  const [change, setChange] = useState(false)
  return (
    <div className="main-div flex-justify-spacebetween">
      <div className="column-gap mainMedia flex" style={{ paddingLeft: '20px', paddingBottom: '50px' }}>
        {!change ? (
          <Image alt="IMG" src={IMG.MainLogoBlack} className="center" onMouseEnter={() => setChange(true)} />
        ) : (
          <Image
            alt="IMG"
            src={IMG.MainLogoYello}
            className="center"
            onMouseLeave={() => {
              setChange(false)
            }}
          />
        )}

        <div className="InnerDiv">
          <div className="grid_tamplate media-center-text" style={{ color: 'rgba(0, 0, 0, 0.70)', fontWeight: '400' }}>
            <div>Navigating best of W3</div>
            <div
              style={{
                fontStyle: 'italic',
                fontWeight: '600',
                fontSize: '20px',
              }}
            >
              Cross-Chain and Impact-Centered
            </div>
          </div>
          <button>
            <a href="mailto:samir.c@webllisto.com">Contact Us</a>
          </button>
        </div>
      </div>
      <div style={{ alignSelf: 'center', rowGap: '20px' }} className="flex-align-center media-logo">
        <div style={{ fontSize: '18px' }}>Part of the family</div>
        <Image alt="IMG" src={IMG.Logo} />
      </div>
    </div>
  )
}
