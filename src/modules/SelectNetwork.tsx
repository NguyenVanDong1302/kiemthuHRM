import { useState } from "react";

import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Panel } from "rsuite";
import * as AuthService from "services/auth_service";

const SelectNetwork = () => {
  const NetWorkID: string = `${import.meta.env.VITE_NETWORK_FIX}`;

  const [list, setList] = useState<any>([]);

  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getMyNetworkList().then((resp) => {
      if (resp.Success) {
        setList(resp.Data);
      } else {
        toast.error(resp.ErrorMessage);
      }
    });
  }, []);

  useEffect(() => {
    if (list.length === 1) {
      if (list[0].Id) {
        navigate(`/${list[0].Id}`);
      }
    } else if (list.length > 1 && NetWorkID) {
      navigate(`/${NetWorkID}`);
    }
  }, [list]);

  return (
    <>
      <section className="content">
        <div className="sidebar-page">
          <section className="content">
            <Container>
              <Panel
                header="Select network"
                shaded
                className="m-5 text-lg-left"
              >
                {list.map((i: any) => (
                  <h6 key={i.Id} className="p-2">
                    <Link to={`/${i.Id}`}>{i.Name}</Link>
                  </h6>
                ))}
              </Panel>
              <Panel>
                <h1></h1>
              </Panel>
            </Container>
          </section>
        </div>
      </section>
    </>
  );
};

export default SelectNetwork;
