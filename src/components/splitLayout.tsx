"use client"
import {StickyChild} from "@/components/sticky";
import React from "react";

export function SplitLayout(props: {  id: string, sidebar: React.JSX.Element, body: React.JSX.Element }) {
  return (
    <div className="flex flex-row h-lvh">
      <div className="w-1/4 bg-gradient-to-r from-black">
        <StickyChild id={props.id} debug={false}>
          {props.sidebar}
        </StickyChild>
      </div>

      <div className="min-h-lvh w-3/4">
        {props.body}
      </div>
    </div>
  )
}

