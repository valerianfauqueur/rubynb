module ApplicationHelper
  def avatar_url(user, size ='medium')
    user.avatar.url(size)
  end
end
