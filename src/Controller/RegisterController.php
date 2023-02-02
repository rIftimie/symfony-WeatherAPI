<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class RegisterController extends AbstractController
{
    #[Route('/register', name: 'app_register_index',)]
    public function index(): Response
    {
        return $this->render('register/index.html.twig');
    }
    #[Route('/user/register', name: 'app_register', methods:["POST"])]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        //create response and user
        $response = new Response();
        $response->setStatusCode(404);
        
        // get data from client-form.
        $parameters = json_decode($request->getContent(), true);
        // check if username && token are in db:
        if(!$em->getRepository(User::class)->findBy(["username"=>$parameters["name"]])){
            $user = new User();
            $user->setUserName($parameters["name"]);
            $user->setPassword($parameters["password"]);

            // token creation
            $date = new \DateTime();
            $apikey = str_split($user->getUsername(),3)[0];
            for ($i=0; $i < 15; $i++) {
                if(random_int(0,1)){
                    $apikey.=random_int(0,9);

                } else {
                    $apikey.=chr(random_int(97,122));
                }
            }
            $apikey.=$date->format("dYmsih");

            $user->setToken($apikey);

            // save in db
            $em->persist($user);
            $em->flush();

            // return token
            $response->setStatusCode(200);

            $response->setContent(json_encode([
                'data' => $apikey,
            ]));
            $response->headers->set('Content-Type', 'application/json');
        }

        return $response;
    }
}
