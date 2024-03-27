"use client"
import {Sticky} from "@/components/sticky";
import React from "react";

export function SplitLayout(props: {  id: string, menu: any, body: any }) {
  return (
    <div className="flex flex-row h-lvh">
      <div className="w-1/4 bg-gradient-to-r from-black">
        <Sticky id={props.id} debug={false}>
          {props.menu}
        </Sticky>
      </div>

      <div className="min-h-lvh w-3/4">
        {props.body}
      </div>
    </div>
  )
}

