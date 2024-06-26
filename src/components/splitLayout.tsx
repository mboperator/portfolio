"use client"
import {StickyChild} from "@/components/sticky";
import React from "react";

export function SplitLayout(props: { sidebar: React.JSX.Element, body: React.JSX.Element }) {
  return (
    <div className="flex flex-col md:flex-row min-h-lvh">
      <div className="w-full md:w-1/4 bg-gradient-to-r from-black">
        {props.sidebar}
      </div>

      <div className="md:min-h-lvh w-full md:w-3/4">
        {props.body}
      </div>
    </div>
  )
}
