<?php

namespace App\Http\Controllers;

use App\GroupRole;
use App\Http\Requests\AttachMembersGroupRequest;
use App\Http\Requests\ChangeRoleRequest;
use App\Http\Requests\DetachMembersGroupRequest;
use App\Http\Requests\EditGroupRequest;
use App\Http\Requests\GroupRegisterRequest;
use App\Http\Requests\SendMailRequest;
use App\Http\Requests\StoregroupRequest;
use App\Mail\InviteMember;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $groups = $user->groups()
            ->wherePivot('invited', false)
            ->withCount(['users' => function($query) {
                $query->where('group_user.invited', false);
            }])
            ->latest()
            ->get()
            ->load('users');

        $invitedToGroups = $user->groups()
            ->wherePivot('invited', true)
            ->latest()
            ->get()
            ->load('users') ?? [];

        return Inertia::render('groups/index', compact('groups', 'invitedToGroups'));
    }

    public function create(): Response
    {
        return Inertia::render('groups/create');
    }

    public function show(Group $group): Response
    {
        $group->load('users');
        $users = $group->users()->wherePivot('invited', false)->get();


        return Inertia::render('groups/show', compact('group', 'users'));
    }

    public function edit(Group $group): Response
    {
        $roles = GroupRole::cases();
        $group->load('users');
        $users = $group->users()->wherePivot('invited', false)->get();
        return Inertia::render('groups/edit', compact('group', 'roles', 'users'));
    }

    public function store(StoregroupRequest $request): RedirectResponse
    {
        $user = $request->user();

        $group = Group::create([
            'name' => $request->validated('name'),
        ]);

        $group->users()->attach($user, ['role' => GroupRole::OWNER]);

        return redirect()->route('groups.show', $group);
    }

    public function update(EditGroupRequest $request, Group $group): RedirectResponse
    {
        $group->name =  $request->validated('name');

        $group->save();

        return redirect()->back()->with('succes', 'aanpassingen opgeslagen');
    }

    public function sendMail(SendMailRequest $request, Group $group): RedirectResponse
    {
        $inputEmail = $request->validated('email');
        $user = User::where('email', $inputEmail) 
            ->first();

        if ($user) {
                $id = $user->id;

                if ($group->users()->where('user_id', $id)->exists()) {
                    return redirect()->back()->with('error', 'This user is already a member');
                }
                Mail::to($inputEmail)
                ->send(new InviteMember($group, $inputEmail)); 

                $group->users()->attach($user, ['invited' => true]);
                return redirect()->back()->with('success', 'Deze gebruiker is uitgenodigt');
        } else {
            User::create([
                'name' => 'User',
                'email' => $inputEmail,
            ]);
            $user = User::where('email', $inputEmail) 
            ->first();
            Mail::to($inputEmail)
                ->send(new InviteMember($group, $inputEmail)); 
            $group->users()->attach($user, ['invited' => true]);
        }
        return redirect()->back()->with('succes', 'gebruiker is uitgenodigt om een account the maken');
    }

    public function attachUser(Group $group): RedirectResponse
    {
        $user = request()->user();

        $group->users()->updateExistingPivot($user->id, ['invited' => false]);

        return redirect()->back()->with('success', 'Je bent aan de groep toegevoegd!');
    }

    public function detachUser(Group $group, User $user): RedirectResponse
    {
        $group->users()->detach($user);
        
        return redirect()->back()->with('succes', 'user removed from group members');
    }

    public function changeRole(ChangeRoleRequest $request, Group $group): RedirectResponse
    {
        $ownerCount = $group->users()->where('role', 'owner')->count();
        $user = $group->users()->where('user_id', $request->validated('user'))->first();

        if ($ownerCount === 1 && $user->pivot->role === 'owner') {
            return redirect()->back()->with('error', 'Er moet altijd 1 owner in de groep zitten');
        }

        $group->users()->updateExistingPivot($request->validated('user'), ['role' => $request->validated('role')]);

        return redirect()->back();
    }

    public function register(string $email): Response | RedirectResponse
    {
        $decodedEmail = urldecode($email);

        $user = User::where('email', $decodedEmail)
            ->first();

        if ($user->password !== null) {
            return redirect()->route('groups.index');
        }
        return Inertia::render('groups/register', ['email' => $decodedEmail]);
    }
    
    public function registerStore(GroupRegisterRequest $request): RedirectResponse
    {
        $user = User::where('email', $request->validated('email'))->first();
        
        $user->name = $request->validated('name');

        $user->password = Hash::make($request->validated('password'));

        $user->email_verified_at = now();

        $user->save();

        return redirect()->route('login')->with('succes', 'je bent aangemeld!');
    }
}