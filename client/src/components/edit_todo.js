import React, { useState } from "react";
import { useParams } from "react-router";

export default function EditTodo() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: [],
      });
      const params = useParams();
     

    return (
        <div>
            Hello {params.id.toString()}
        </div>
    )
}